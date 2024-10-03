import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const LoginContext = createContext<
  Partial<{
    changeEmail: (email: string) => void;
    changePassword: (password: string) => void;
    loginStatus: "success" | "failed" | "ready" | "login" | "logout";
    login: () => void;
    logout: () => void;
    loginLoading: boolean;
    dialogRef: React.RefObject<HTMLDialogElement>;
  }>
>({});

const useLoginContext = () => useContext(LoginContext);

function useLogin() {
  const EMAIL = "EMAIL";
  const PASSWORD = "PASSWORD";

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<
    "success" | "failed" | "ready" | "login" | "logout"
  >("ready");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("login");
    setLoginStatus("logout");
  };

  const handleEmail = (email: string) => {
    setLoginStatus("ready");
    setEmail(email);
  };

  const handlePassword = (password: string) => {
    setLoginStatus("ready");
    setPassword(password);
  };

  const handleLogin = () => {
    setLoading(true);

    if (!email || !password) {
      setLoginStatus("failed");
      setLoading(false);
      return;
    }

    const pass = email === EMAIL && password === PASSWORD;

    setTimeout(() => {
      setLoginStatus(pass ? "success" : "failed");
      setLoading(false);

      if (pass) {
        localStorage.setItem("login", JSON.stringify({ email, password }));
      }
    }, 3000);
  };

  useEffect(() => {
    if (!dialogRef.current) return;

    if (loading || loginStatus !== "ready") {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }

    return () => dialogRef.current?.close();
  }, [loading, loginStatus]);

  useEffect(() => {
    const checkLogin = localStorage.getItem("login");
    if (checkLogin) {
      setLoginStatus("login");
    }
  }, []);

  return {
    dialogRef,
    loginLoading: loading,
    loginStatus,
    changeEmail: handleEmail,
    changePassword: handlePassword,
    login: handleLogin,
    logout: handleLogout,
  };
}

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    dialogRef,
    loginLoading,
    loginStatus,
    changeEmail,
    changePassword,
    login,
    logout,
  } = useLogin();
  return (
    <LoginContext.Provider
      value={{
        dialogRef,
        loginLoading,
        loginStatus,
        changeEmail,
        changePassword,
        login,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const Login = () => {
  const {
    loginStatus,
    loginLoading,
    changeEmail,
    changePassword,
    login,
    logout,
    dialogRef,
  } = useLoginContext();

  return (
    <div>
      <h3>Login Page</h3>
      {loginStatus !== "success" && loginStatus !== "login" ? (
        <div>
          <input type="email" onChange={(e) => changeEmail?.(e.target.value)} />
          <input
            type="password"
            onChange={(e) => changePassword?.(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div onClick={logout}>Logout</div>
      )}

      {loginLoading || loginStatus !== "ready" ? (
        <dialog ref={dialogRef} onClick={() => dialogRef?.current?.close()}>
          {loginStatus !== "ready" ? (
            <div>{loginStatus}</div>
          ) : (
            <div>Check Account...</div>
          )}
        </dialog>
      ) : null}
    </div>
  );
};
