import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const MainLayout = ({ children }) => {

  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
};

export default MainLayout;
