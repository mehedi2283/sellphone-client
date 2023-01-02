import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import useAdmin from "../../hook/useAdmin";
import useBuyer from "./../../hook/useBuyer";
import { IoLogOutSharp } from "react-icons/io5";
import "./navbar.css";
import logo from "../.././assets/logo/web-logo.png";


const Navbar = () => {
    const navigate = useNavigate();

    const {
        user,
        logOut,
        setSearch,
        totalAll,
        totalLow,
        totalEntry,
        totalHigh,
    } = useContext(AuthContext);

    const [isAdmin] = useAdmin(user?.email);
    // const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

    // const handleNavigate = (isAdmin, isSeller, isBuyer) => {
    //     console.log(isAdmin, isSeller, isBuyer);
    //     if (isAdmin === true) {
    //         navigate("/dashboard/all-users");
    //     }
    // };

    console.log("i am user", isAdmin);
    const handleLogOut = () => {
        logOut();
        toast.success("Successfully logged out");
        navigate("/sign_in");
    };

    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-1000px";
        }
        prevScrollpos = currentScrollPos;
    };

    let activeStyle = {
        backgroundColor: "#000000",
        color: "white",
    };

    const searchRef = useRef();
    const handleSearch = () => {
        setSearch(searchRef.current.value);
    };
    return (
        <>
            <div className=" flex backdrop-blur-lg bg-opacity-50 px-0 justify-items-center h-14 justify-between responsiveNav">
                <div className=" flex items-center">
                    <NavLink to="/" className=" px-4  ">
                        <img src={logo} alt="logo" className="w-28 my-auto translate-y-4" />
                    </NavLink>
                </div>

                <div class="flex justify-center search ">
                    <div class="  searchDiv flex items-center ">
                        <div class="rounded-sm input-group relative opacity-50 flex h-10  w-full items-center">
                            <input
                                ref={searchRef}
                                onChange={handleSearch}
                                type="search"
                                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="button-addon2"
                            ></input>
                            <button
                                onClick={handleSearch}
                                class=" searchBtn h-9 px-6  bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                                type="button"
                                id="button-addon2"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="search"
                                    class="w-4 "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className="navbar-end">
    <Link to='/sign_in' className="btn">Login</Link>
  </div> */}
                <div className="flex items-center">
                    <div className=" hidden lg:flex gap-2 ">
                        <div className="menu menu-horizontal p-0">
                            {user ? (
                                <div className="flex items-center justify-end gap-2">
                                    <NavLink
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className=" px-2 hover:bg-primary/70 text-black hover:text-white duration-300 rounded-sm h-8 flex items-center"
                                        to={`${
                                            isBuyer
                                                ? "/dashboard/myOrder"
                                                : isAdmin
                                                ? "/dashboard/all-users"
                                                : "dashboard/MyProducts"
                                        }`}
                                    >
                                        <span className="me-2 font-bold fs-5  ">
                                            Dashboard
                                        </span>
                                    </NavLink>
                                    {/* <Link
                            className=" btn btn-primary btn-sm "
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Link> */}
                                </div>
                            ) : (
                                " "
                            )}
                        </div>
                        <NavLink
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to="/blogs"
                            className="font-bold px-2 hover:bg-primary/70 text-black hover:text-white duration-300 rounded-sm h-8 flex items-center  "
                        >
                            Blogs
                        </NavLink>
                    </div>
                    {user ? (
                        <div className="flex items-center justify-end gap-2">
                            <NavLink to="/profile" className="">
                                <img
                                    alt=""
                                    className="rounded-full"
                                    src={user?.photoURL}
                                    style={{ height: "40px" }}
                                ></img>
                            </NavLink>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                className="hidden lg:flex px-2 hover:bg-primary/70 hover:text-white duration-300 rounded-sm h-8  items-center font-bold "
                                to="/profile"
                            >
                                <span className="me-2 fs-5 ">
                                    {user?.displayName}
                                </span>
                            </NavLink>
                            <Link
                                className=" px-2 hover:bg-red-600/90 hover:text-white duration-300 rounded-sm h-8 flex items-center  bg-red-400/80 font-bold text-white"
                                onClick={handleLogOut}
                            >
                                Log Out{" "}
                                <span className="ml-1">
                                    <IoLogOutSharp></IoLogOutSharp>
                                </span>
                            </Link>
                        </div>
                    ) : (
                        <div className=" items-center flex">
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                to="/sign_in"
                                className="ms-3 px-3 py-2 btn btn-sm normal-case rounded-sm bg-primary-300/70 hover:bg-primary-600/70 mx-2 border-0 text-white"
                            >
                                Sign In
                            </NavLink>
                            {/* <NavLink
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to="/sign_up"
                            className="ms-3 bg-teal-300/70 rounded-sm hover:bg-primary/70 mx-2 border-0 py-2 btn btn-primary btn-sm   uppercase rounded-3"
                        >
                            Register
                        </NavLink> */}

                            <label
                                htmlFor="dashboard-drawer"
                                tabIndex={2}
                                className="btn btn-ghost btn-sm lg:hidden my-0 py-0"
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
                    )}
                </div>
            </div>
            {user && (
                <div class="flex lg:min-w-0 flex-1 justify-center sm:gap-x-12 backdrop-blur-lg py-2">
                    <div className="lg:hidden items-center ">
                        <div className="dropdown">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-sm lg:hidden"
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
                            <ul
                                tabIndex={0}
                                className="menu  menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <NavLink
                                        to="profile "
                                        className="z-40 font-semibold justify-center"
                                    >
                                        {user?.displayName}
                                    </NavLink>
                                </li>
                                <hr />

                                <li>
                                    {user && (
                                        <NavLink
                                            className="z-40 px-6 justify-center "
                                            to={`${
                                                isBuyer
                                                    ? "/dashboard/myOrder"
                                                    : isAdmin
                                                    ? "/dashboard/all-users"
                                                    : "dashboard/MyProducts"
                                            }`}
                                        >
                                            <span className="me-2 font-semibold  text-center ">
                                                Dashboard
                                            </span>
                                        </NavLink>
                                    )}
                                </li>

                                <li>
                                {user && (
                                    <NavLink
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        to="blogs "
                                        className="z-40 font-semibold justify-center"
                                    >
                                        Blogs
                                    </NavLink>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Link
                        to="/productsByBrand/Low Budget"
                        class="hover:underline navLink font-semibold text-black indicator "
                    >
                        Low Budget
                        <span className="indicator-item badge -translate-y-3.5">{totalLow}</span>
                    </Link>

                    <Link
                        to="/productsByBrand/Entry Level"
                        class="hover:underline navLink font-semibold text-black indicator"
                    >
                        Entry Level
                        <span className="indicator-item badge -translate-y-3.5">
                            {totalEntry}
                        </span>
                    </Link>

                    <Link
                        to="/productsByBrand/High Budget"
                        class="hover:underline navLink font-semibold  text-black indicator"
                    >
                        Hight Budget
                        <span className="indicator-item badge -translate-y-3.5">
                            {totalHigh}
                        </span>
                    </Link>
                    <Link
                        to="/all-products"
                        class="hover:underline navLink font-semibold text-black indicator "
                    >
                        All Products
                        <span className="indicator-item badge -translate-y-3.5">{totalAll}</span>
                    </Link>
                </div>
            )}
        </>
    );
};

export default Navbar;
