import React from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import useAdmin from "../../hook/useAdmin";
import useSeller from "./../../hook/useSeller";
import useBuyer from "./../../hook/useBuyer";

const Navbar = () => {
    const navigate = useNavigate();

    const { user, logOut } = useContext(AuthContext);

    // const [isAdmin] = useAdmin(user?.email);
    // const [isSeller] = useSeller(user.email);
    // const [isBuyer] = useBuyer(user.email);

    // const handleNavigate = (isAdmin, isSeller, isBuyer) => {
    //     console.log(isAdmin, isSeller, isBuyer);
    //     if (isAdmin === true) {
    //         navigate("/dashboard/all-users");
    //     }
    // };

    // console.log("i am user", user);
    const handleLogOut = () => {
        logOut();
        toast.success("Successfully logged out");
        navigate("/");
    };

    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-80px";
        }
        prevScrollpos = currentScrollPos;
    };
    return (
        <div className="navbar bg-base-100 justify-around">
            <div className="">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link>Item 1</Link>
                        </li>

                        <li>
                            <Link>Item 3</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    SellPhone
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <div className="menu menu-horizontal p-0">
                    {user ? (
                        <div className="flex items-center justify-end gap-2">
                            {/* {isAdmin && (
                                <Navigate to="/dashboard/all-users" replace={true} />
                            )}
                            {isSeller && (
                                <Navigate to="/dashboard" replace={true} />
                            )}
                            {isBuyer && (
                                <Navigate to="/dashboard" replace={true} />
                            )} */}

                            <NavLink
                                className=" px-6 "
                                to="/dashboard"
                                // onClick={() =>
                                //     handleNavigate(isAdmin, isSeller, isBuyer)
                                // }
                            >
                                <span className="me-2 fs-5 ">Dashboard</span>
                            </NavLink>
                            {/* <Link
                            className=" btn btn-primary "
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Link> */}
                        </div>
                    ) : (
                        " "
                    )}
                </div>
                <NavLink>Blogs</NavLink>
            </div>
            {/* <div className="navbar-end">
    <Link to='/sign_in' className="btn">Login</Link>
  </div> */}
            <div>
                {user ? (
                    <div className="flex items-center justify-end gap-2">
                        {/* <NavLink to="/profile" className="">
                            <img
                                alt=""
                                className="rounded-full"
                                src={user?.photoURL}
                                style={{ height: "40px" }}
                            ></img>
                        </NavLink> */}
                        <NavLink
                            className=" px-6 btn btn-ghost  uppercase"
                            to="/profile"
                        >
                            <span className="me-2 fs-5 ">
                                {user?.displayName}
                            </span>
                        </NavLink>
                        <Link
                            className=" btn btn-primary "
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Link>
                    </div>
                ) : (
                    <div className="">
                        <NavLink
                            to="/sign_in"
                            className="ms-3 px-3 py-2 btn btn-primary  uppercase rounded-3 mr-2"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/sign_up"
                            className="ms-3 px-3 py-2 btn btn-primary   uppercase rounded-3"
                        >
                            Register
                        </NavLink>
                    </div>
                )}
            </div>

            <label
                htmlFor="dashboard-drawer"
                tabIndex={2}
                className="btn btn-ghost lg:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </label>
        </div>
    );
};

export default Navbar;
