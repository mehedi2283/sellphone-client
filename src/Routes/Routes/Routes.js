import Main from "./../../layout/Main";
import Home from "./../.././components/Home/Home";

import Error404 from "./../.././components/404/Error404";
import SignIn from "./../../components/Login/SignIn/SignIn";
import SignUp from "./../../components/Login/SignUp/SignUp";
import AllProducts from "./../../components/AllProducts/AllProducts";

import PrivateRoutes from "./../PrivateRoutes/PrivateRoutes";
import DashboardLayout from "../../layout/DashboardLayout";
import MyOrders from "../../components/dashboard/MyOrders/MyOrders";
import Payment from "../../components/dashboard/Payment/Payment";
import AllUsers from "./../../components/dashboard/AllUsers/AllUsers";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import SellerRoutes from "../SellerRoutes/SellerRoutes";
import AddProducts from "../../components/dashboard/AddProducts/AddProducts";
import MyProducts from "../../components/dashboard/MyProducts/MyProducts";

import BuyerRoutes from "../BuyerRoute/BuyerRoute";
import LowBudget from "./../../components/LowBudget/LowBudget";
import EntryLevel from "../../components/EntryLevel/EntryLevel";
import HighBudget from "../../components/HighBudget/HighBudget";

const { createBrowserRouter } = require("react-router-dom");

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/sign_in",
                element: <SignIn></SignIn>,
            },
            {
                path: "/sign_up",
                element: <SignUp></SignUp>,
            },
            {
                path: "/all-products",
                element: (
                    <PrivateRoutes>
                        <AllProducts></AllProducts>
                    </PrivateRoutes>
                ),
               
            },
            {
                path: "/productsByBrand/Low Budget",
                element: (
                    <PrivateRoutes>
                        <LowBudget></LowBudget>
                    </PrivateRoutes>
                ),
                
            },
            {
                path: "/productsByBrand/Entry Level",
                element: (
                    <PrivateRoutes>
                        <EntryLevel></EntryLevel>
                    </PrivateRoutes>
                ),
               
            },
            {
                path: "/productsByBrand/High Budget",
                element: (
                    <PrivateRoutes>
                        <HighBudget></HighBudget>
                    </PrivateRoutes>
                ),
              
            },

        ],
    },

    {
        path: "/",
        element: (
            <PrivateRoutes>
                <DashboardLayout></DashboardLayout>
            </PrivateRoutes>
        ),
        children: [
            {
                path: "/dashboard/myOrder",
                element: (
                    <BuyerRoutes>
                        <MyOrders></MyOrders>
                    </BuyerRoutes>
                ),
            },
            {
                path: "/dashboard/all-users",
                element: (
                    <AdminRoutes>
                        <AllUsers></AllUsers>
                    </AdminRoutes>
                ),
            },
            {
                path: "/dashboard/addMyProducts",
                element: (
                    <SellerRoutes>
                        <AddProducts></AddProducts>
                    </SellerRoutes>
                ),
            },
            {
                path: "/dashboard/MyProducts",
                element: (
                    <SellerRoutes>
                        <MyProducts></MyProducts>
                    </SellerRoutes>
                ),
            },
            { path: "/dashboard/payment", element: <Payment></Payment> },
        ],
    },

    {
        path: "*",
        element: <Error404></Error404>,
    },
]);
