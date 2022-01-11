import { Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";
import Stat from "./pages/Stat";
import CharacterCounter from "./pages/CharacterCounter";
import RecoilTodo from "./pages/RecoilTodo";
// import { lazy } from "react";
// const About = lazy(() => import("./pages/About"))
// const Article = lazy(() => import("./pages/Article"))
// const Articles = lazy(() => import("./pages/Articles"))
// const Login = lazy(() => import("./pages/Login"))
// const MyPage = lazy(() => import("./pages/MyPage"))
// const NotFound = lazy(() => import("./pages/NotFound"))
// const Profile = lazy(() => import("./pages/Profile"))
// const Todo = lazy(() => import("./pages/Todo"))

function App() {
  return (
    <>
      <div>
        <Link to={"/"}>Main</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/todo"}>Todo</Link>
      </div>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/"} element={<Main />} />
          <Route path={"/about"} element={<About />}></Route>
          <Route path={"/profiles/:username"} element={<Profile />}></Route>
          <Route path={"/todo"} element={<Todo />}></Route>
          <Route path={"/stat"} element={<Stat />}></Route>
          <Route path={"/character"} element={<CharacterCounter />}></Route>
          <Route path={"/recoil-todo"} element={<RecoilTodo />}></Route>
        </Route>
        <Route path={"/articles"} element={<Articles />}>
          <Route path={":id"} element={<Article />}></Route>
        </Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/mypage"} element={<MyPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
