import { Link } from "react-router-dom";
function Main() {
  return (
    <div>
      <h1>Main</h1>
      <ul>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          <Link to={"/profiles/user1"}>user1</Link>
        </li>
        <li>
          <Link to={"/profiles/user2"}>user2</Link>
        </li>
        <li>
          <Link to={"/profiles/void"}>Not Exist</Link>
        </li>
        <li>
          <Link to={"/articles"}>Articles</Link>
        </li>
      </ul>
    </div>
  );
}

export default Main;
