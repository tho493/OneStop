import Footer from "../components/Footer/Footer";
import HeaderMain from "../components/HeaderMain/HeaderMain";
import { Outlet, useLocation } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import News from "../components/News/News";
import Card from "../components/Card/Card";

const LayoutMain = () => {
  const location = useLocation();
  const current = location.pathname;

  console.log(current)
  return (
    <div className="min-h-screen flex flex-col overflow-y-auto overflow-x-hidden">
      <HeaderMain />
      {current !== '/' ? <></> : <Slider />}
      {current !== '/' ? <></> : <News />}
      <Outlet />
      {current !== '/' ? <></> : <Card />}
      <Footer />
    </div>
  );
};

export default LayoutMain;
