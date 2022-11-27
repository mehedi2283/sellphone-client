import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
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
                className="mb-6 duration-300  bg-base-100/95 drop-shadow-xl shadow-primary sticky top-0 z-10"
            >
                <Navbar></Navbar>
            </div>
            <div className="drawer drawer-mobile">
                <input
                    id="dashboard-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side ">
                    <label
                        htmlFor="dashboard-drawer"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80  max-lg:bg-base-100 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        {
                            isBuyer &&
                            <li>
                                <Link to="/dashboard/myOrder">My Orders</Link>
                            </li>
                        }
                        {isSeller && (
                            <>
                                
                                <li>
                                    <Link to="/dashboard/MyProducts">
                                        My Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/addMyProducts">
                                        Add A Product
                                    </Link>
                                </li>
                            </>
                        )}
                        {isAdmin && (
                            <li>
                                <Link to="/dashboard/all-users">All Users</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
