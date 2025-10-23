import './Footer.css';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const footerClass = location.pathname === "/" ? "footerHome" : "";
  return (
    <footer className={footerClass}>
      <p>Todos los derechos reservados. 2025 &copy;</p>
    </footer>
  );
};

export default Footer;