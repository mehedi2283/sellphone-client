import { useQuery } from "@tanstack/react-query";

import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import useTitle from "../../hooks/useTitle";
import ProductCard from "./../ProductCard/ProductCard";

const AllProducts = () => {
    // const allProductscollection = useLoaderData();

    useTitle("All Products");

    const { search } = useContext(AuthContext);
    // console.log(search);

    const {
        data: allProductscollection = [],
        refetch,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const res = await fetch(
                ` https://sellphone-server-mehedi2283.vercel.app/all-products?search=${search}`
            );
            const data = await res.json();
            // setTotalAll(allProductscollection.length)
            return data;
        },
    });
    refetch();

    // const {isLoading,data,refetch} = useQuery(['sellers'],axios.get("https://sellphone-server-mehedi2283.vercel.app/all-products"))

    // console.log(data);

    const [productDetails, setProductDetails] = useState([]);
    const handleProductDetails = (id) => {
        fetch(
            `https://sellphone-server-mehedi2283.vercel.app/all-products/${id}`
        )
            .then((res) => res.json())
            .then((data) => setProductDetails(data));

        console.log(id);
    };
    // console.log(productDetails);

    if (isLoading) {
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
        <div>
            <h1 className="text-4xl text-center my-9 font-bold">
                You can find our all products from here.
            </h1>

            {search && (
                <h1 className="text-3xl text-center my-9 font-bold">
                    Total search result found: {allProductscollection.length}
                </h1>
            )}
            <div className="grid lg:grid-cols-3 justify-items-center ">
                {allProductscollection.map((product) => (
                    <ProductCard
                        handleProductDetails={handleProductDetails}
                        setProductDetails={setProductDetails}
                        productDetails={{ productDetails }}
                        product={product}
                        key={product._id}
                        refetch={refetch}
                        isLoading={isLoading}
                        isFetching={isFetching}
                    ></ProductCard>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
