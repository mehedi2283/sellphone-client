import React, { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import AdvertiseProductCard from "../AdvertiseProductCard/AdvertiseProductCard";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
// import OrderModal from "../BookNowModal/BookNowModal";
import ProductCard from "./../ProductCard/ProductCard";
// import useBuyer from "./../../hook/useBuyer";
import { HiChevronDoubleDown } from "react-icons/hi2";
// import useSeller from "../../hook/useSeller";
// import useAdmin from "../../hook/useAdmin";
import useTitle from "../../hooks/useTitle";

const Home = () => {
    useTitle("Home");
    //  const {user} = useContext(AuthContext)

    const { user, loading } = useContext(AuthContext);
    // const [isBuyer] = useBuyer(user?.email)
    // const [isSeller] = useSeller(user?.email)
    // const [isAdmin] = useAdmin(user?.email)

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`sellphone-server-mehedi2283.vercel.app/brands`)
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, []);

    // console.log(categories);

    // const handleBrandProducts = (name) => {
    //     console.log(name);
    // };

    const [productDetails, setProductDetails] = useState([]);
    const handleProductDetails = (id) => {
        fetch(`sellphone-server-mehedi2283.vercel.app/all-products/${id}`)
            .then((res) => res.json())
            .then((data) => setProductDetails(data));

        console.log(id);
    };

    // const {
    //     data: advertiseProducts = [],
    //     refetch,
    //     isLoading,
    // } = useQuery({
    //     queryKey: ["advertise bal"],
    //     queryFn: async () => {
    //         const res = await fetch(
    //             "https://sellphone-server-mehedi2283.vercel.app/advrtiseMent"
    //         );
    //         const data = await res.json();
    //         return data;
    //     },
    // });

    const [advertiseProducts, setAdvertiseProducts] = useState([]);

    useEffect(() => {
        fetch(`sellphone-server-mehedi2283.vercel.app/advrtiseMent`)
            .then((res) => res.json())
            .then((data) => setAdvertiseProducts(data))
            .catch((err) => console.log(err));
    }, [advertiseProducts.length]);

    console.log("totoal advertised product:", advertiseProducts.length);

    if (loading) {
        return (
            <div className="border my-72 border-primary/90 shadow rounded-md p-4 max-w-sm w-full mx-auto  ">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-primary h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-primary rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-primary rounded"></div>
                            <div className="h-4 bg-primary rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-12">
            <div className="grid mx-auto  md:col-span-2 ">
                <div className="flex md:flex-col md:items-start py-20 gap-2 ">
                    {categories.map((brand) => (
                        <Link
                            // category={brand.category_name}
                            to={`/productsByBrand/${brand.category_name}`}
                            // onClick={() => handleBrandProducts(brand.category_name)}
                            key={brand._id}
                            className="btn btn-primary mr-4 md:w-full"
                        >
                            {brand.category_name}
                        </Link>
                    ))}
                    <Link
                        to="/all-products"
                        className="btn btn-primary md:w-full"
                    >
                        All products
                    </Link>
                </div>
            </div>

            <div className="mt-10 md:col-span-10 ">
                <div className="hero w-2/3 translate-x-20 mb-6">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">
                                Welcome to SellPhone
                            </h1>
                            <p className="py-6 text-2xl font-medium">
                                Thanks for visiting our website. <br />
                                Please check our products.
                            </p>
                            <div className=" duration-300 animate-bounce">
                                <p className="hover:text-white btn-circle btn-primary transition btn btn-outline">
                                    <HiChevronDoubleDown className="h-6 w-6 text-center " />
                                </p>
                            </div>
                            <Link
                                to="/all-products"
                                className="btn btn-primary"
                            >
                                Visit Products
                            </Link>
                        </div>
                    </div>
                </div>

                {
                    // eslint-disable-next-line no-mixed-operators

                    <div
                        className={`${
                            advertiseProducts.length > 0 ? " " : "hidden"
                        }`}
                    >
                        <h1 className="text-5xl -translate-x-44 text-center font-bold ">
                            Featured Products {advertiseProducts.length}
                        </h1>
                        <div className="border mt-4 p-5 w-11/12 grid md:grid-cols-3">
                            {advertiseProducts.map((product) => (
                                <ProductCard
                                    handleProductDetails={handleProductDetails}
                                    setProductDetails={setProductDetails}
                                    productDetails={{ productDetails }}
                                    product={product}
                                    key={product._id}
                                    // refetch={refetch}
                                ></ProductCard>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;
