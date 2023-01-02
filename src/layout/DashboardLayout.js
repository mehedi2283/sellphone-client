import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeHero1 from "../components/Home/HomeHero1";
import { AuthContext } from "../context/AuthProvider/AuthProvider";
import useBuyer from "../hook/useBuyer";
import useSeller from "../hook/useSeller";
import Navbar from "./../components/Navbar/Navbar";
import useAdmin from "./../hook/useAdmin";

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.email);
    const [isSeller] = useSeller(user.email);
    const [isBuyer] = useBuyer(user.email);
    return (
        <div>
            <div
                id="navbar"
                className=" bg-opacity-0 duration-300  backdrop-blur-lg bg-primary/5 drop-shadow-xl shadow-primary sticky top-0 z-20 border-b-2 border-b-primary"
            >
                <Navbar></Navbar>
            </div>
          
            <div className="drawer drawer-mobile mx-auto">
                <input
                    id="dashboard-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content w-full mx-auto z-10">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side  border-r-2 border-primary z-0">
                    <label
                        htmlFor="dashboard-drawer"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80  max-lg:bg-base-100 bg-base-100 text-base-content text-center">
                        {/* <!-- Sidebar content here --> */}
                        {isBuyer && (
                            <li>
                                <Link
                                    className="justify-center font-bold text-xl border-b-2 border-primary hover:bg-primary/10"
                                    to="/dashboard/myOrder"
                                >
                                    My Orders
                                </Link>
                            </li>
                        )}
                        {isSeller && (
                            <div className="">
                               
                                    <Link
                                        className="btn-primary btn border-0 btn-outline mb-2 font-bold text-xl border-b-2 border-primary hover:bg-red/100 w-full"
                                        to="/dashboard/MyProducts"
                                    >
                                        My Products
                                    </Link>
                                
                               
                                    <Link
                                        className="btn-primary btn border-0 btn-outline font-bold text-xl border-b-2 border-primary hover:bg-primary/10 w-full"
                                        to="/dashboard/addMyProducts "
                                    >
                                        Add A Product
                                   
                                </Link>
                            </div>
                        )}
                        {isAdmin && (
                            <li>
                                <Link
                                    className="justify-center font-bold text-xl border-b-2 border-primary"
                                    to="/dashboard/all-users"
                                >
                                    All Users
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
           
        </div>
    );
};

export default DashboardLayout;
