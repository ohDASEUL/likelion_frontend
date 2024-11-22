import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <h1>리액트 라우터 - 02 리액트 라우터 사용</h1>

        <NavLink
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/page1"
        >
          page1
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/page2"
        >
          page2
        </NavLink>
      </header>
    </>
  );
}

export default Header;
