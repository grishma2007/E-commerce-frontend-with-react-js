import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />

      <Outlet />   {/* Page content will render here */}

      <div className="footer-bg">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
