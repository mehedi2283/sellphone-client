import React from "react";
import { Outlet } from "react-router-dom";


import './main.css'
import Footer from './../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";


const Main = () => {
  return (
    <div className="page-container">
      <div id="navbar" className="mb-6 duration-300  bg-base-100/95 drop-shadow-xl shadow-primary sticky top-0 z-10">
        <Navbar></Navbar>
      </div>
      <div className=" outlet  pb-32">
        <Outlet></Outlet>
      </div>
      <div  className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
