import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./../ProductCard/ProductCard";

const AllProducts = () => {
    // const allProductscollection = useLoaderData();


    const { data: allProductscollection = [], refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/all-products");
            const data = await res.json();
            return data;
        },
    });

    const [productDetails, setProductDetails] = useState([]);
    const handleProductDetails = (id) => {
        fetch(`http://localhost:5000/all-products/${id}`)
            .then((res) => res.json())
            .then((data) => setProductDetails(data));

        console.log(id);
    };
    console.log(productDetails);

    return (
        <div className="grid lg:grid-cols-3 justify-items-center ">
            {allProductscollection.map((product) => (
                <ProductCard
                    handleProductDetails={handleProductDetails}
                    setProductDetails={setProductDetails}
                    productDetails={{ productDetails }}
                    product={product}
                    key={product._id}
                    refetch={refetch}
                ></ProductCard>
            ))}
        </div>
    );
};

export default AllProducts;
