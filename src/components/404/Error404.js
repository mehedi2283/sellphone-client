import React, { useContext } from "react";
import {
    ChevronDoubleUpIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { Link, useRouteError } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Error404 = () => {

    const error = useRouteError()
    const {logOut,setLoading} = useContext(AuthContext)



    useTitle("404");
    return (
        <div className="text-6xl text-center mt-52 text-orange-800 font-black">
            

            <ExclamationTriangleIcon className="h-32 w-32 text-center mx-auto animate-bounce mt-6"></ExclamationTriangleIcon>
            <p className=" ">{error.status || error.message}</p>
            <h1>No Route Found!</h1>
            <h1 className=" ">Something Went Wrong.</h1>
            <Link
                className=" btn btn-lg  btn-outline border-4 hover:border-orange-800 text-orange-800 border-red-800 hover:bg-orange-800"
                to="/"
            >
               
                
                <p  className=" font-bold ">Go Back</p>
                <ChevronDoubleUpIcon className="h-6 w-6 "></ChevronDoubleUpIcon>
            </Link>
        </div>
    );
};

export default Error404;
