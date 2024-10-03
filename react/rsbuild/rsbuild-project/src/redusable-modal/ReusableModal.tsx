import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type ModalInfo = {
  type: "success" | "failed" | "info";
  content: string;
} | null;

const ReusableModalContext = createContext<{
  isOpen: boolean;
  info: ModalInfo | null;
  setOpen: (open: boolean) => void;
  setInfo: (info: ModalInfo) => void;
}>({
  isOpen: false,
  info: null,
  setOpen: () => null,
  setInfo: () => null,
});
export const useReusableModalContext = () => useContext(ReusableModalContext);

export function useReusableModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState<ModalInfo>(null);

  const handleChangeOpen = (open: boolean = false) => {
    setIsOpen(open);
  };

  const handleChangeModalInfo = (info: ModalInfo) => {
    setInfo(info);
  };

  return {
    isOpen,
    info,
    setOpen: handleChangeOpen,
    setInfo: handleChangeModalInfo,
  };
}

export const ReusableModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isOpen, info, setOpen, setInfo } = useReusableModal();
  return (
    <ReusableModalContext.Provider value={{ isOpen, info, setOpen, setInfo }}>
      {children}
    </ReusableModalContext.Provider>
  );
};

export const ReusableModal = () => {
  const { isOpen, info, setOpen } = useReusableModalContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen && info) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      draggable={true}
      aria-labelledby="title"
      aria-describedby="content"
      style={{
        backgroundColor: `${
          info?.type === "success"
            ? "green"
            : info?.type === "failed"
            ? "red"
            : "yellow"
        }`,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 0.3s ease-in-out, transfrom 0.3s ease-in-out",
      }}
    >
      <div id="title">{info?.type} dialog</div>
      <div id="content">{info?.content}</div>

      <button onClick={() => setOpen(false)}>close</button>
    </dialog>
  );
};
