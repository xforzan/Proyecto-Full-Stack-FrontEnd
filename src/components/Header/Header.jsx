import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Menu from "../Menu/Menu";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const headerClass = location.pathname === "/" ? "headerHome" : "";

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
      document.body.style.overflow = "auto";
    }, 200);
  };

  return (
    <header className={headerClass}>
      <Link to="/">
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
      </Link>

      <Menu menuOpen={menuOpen} closeMenu={closeMenu} />

      <img className="avatar"src={ user?.avatar || "https://res.cloudinary.com/dileah1ig/image/upload/v1757442337/avatar_jt1vlf.png"} alt="account" onClick={() => navigate("/account")}/>

      <button className="menu" onClick={menuOpen ? closeMenu : openMenu} aria-label="Abrir menú">
        <img src="/menu.svg" alt="" />
      </button>
    </header>
  );
};

export default Header;
