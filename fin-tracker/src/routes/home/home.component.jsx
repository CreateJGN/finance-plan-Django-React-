import "./home.styles.scss";

import { Outlet } from "react-router-dom";
import Home from "../../components/home/home.component"

const HomeRoute = () => {
  return (
    <div className="home-route-container">
      <Home></Home>
    </div>
  );
};

export default HomeRoute;

