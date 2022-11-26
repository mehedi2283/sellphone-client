import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./../ProductCard/ProductCard";

const AllProducts = () => {
    const allProductscollection = useLoaderData();

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
                ></ProductCard>
            ))}
        </div>
    );
};

export default AllProducts;
