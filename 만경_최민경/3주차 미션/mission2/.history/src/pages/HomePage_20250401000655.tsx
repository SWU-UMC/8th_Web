import React from "react";
import { Outlet } from "react-router-dom";

 const HomePage = (): React.ReactElement => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default HomePage;
