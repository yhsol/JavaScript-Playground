import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goFront = () => navigate(1);
  const goAbout = () => navigate("/about", { replace: true }); // 페이지 기록에 남기지 않음. 뒤로가기 했을 때 스킵. // 근데 잘 안되는 듯? 확인필요
  const goArticles = () => navigate("/articles");
  const goTodo = () => navigate("/todo");
  return (
    <div>
      <header style={{ background: "lightgray", padding: 16, fontSize: 24 }}>
        <button onClick={goBack}>Back</button>
        <button onClick={goFront}>Front</button>
        <button onClick={goAbout}>About</button>
        <button onClick={goArticles}>Articlese</button>
        <button onClick={goTodo}>Todo</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
