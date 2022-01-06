import { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import { Article } from "../types/Articles.types";

type ArticleItemProps = Article & {
  onRead(id: number): void;
  onRemove(id: number): void;
};

const activeStyle: CSSProperties = {
  color: "green",
  fontSize: 21,
};

const ArticleItem = ({
  id,
  text,
  read,
  onRead,
  onRemove,
}: ArticleItemProps) => {
  return (
    <li>
      <NavLink
        to={`/articles/${id}`}
        style={(props) => (props.isActive ? activeStyle : {})}
      >
        article {id}
      </NavLink>
      <div>
        <p>{text}</p>
      </div>
      <div>read: {read ? "done" : "undone"}</div>
      <button onClick={() => onRead(id)}>Read</button>
      <button onClick={() => onRemove(id)}>Remove</button>
    </li>
  );
};

function Articles() {
  const [articles, { read, remove }] = useArticles();
  return (
    <>
      <Outlet />
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <ArticleItem
            id={article.id}
            text={article.text}
            read={article.read}
            onRead={read}
            onRemove={remove}
            key={article.id}
          />
        ))}
      </ul>
    </>
  );
}

export default Articles;
