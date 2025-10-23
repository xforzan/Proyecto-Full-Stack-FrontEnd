import { Link } from "react-router-dom";

const Menu = ({ menuOpen, closeMenu }) => {
  return (
    <nav className={menuOpen ? "open" : ""}>
      <ul>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li className="accountBtn" ><Link to="/account" onClick={closeMenu}>Account</Link></li>
        <li><Link to="/vehicles" onClick={closeMenu}>Vehicles</Link></li>
        <li><Link to="/appointments" onClick={closeMenu}>Appointments</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
