import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";
import ProductCard from "../ProductCard/ProductCard";

const EntryLevel = () => {
    useTitle("Entry Level");
    const { search } = useContext(AuthContext);
    const { data: brandsProducts = [], refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const res = await fetch(
                `https://sellphone-server-mehedi2283.vercel.app/productsByBrand/Entry Level?search=${search}`
            );
            const data = await res.json();
            return data;
        },
    });
    refetch();

    const [productDetails, setProductDetails] = useState({});
    const handleProductDetails = (id) => {
        // setCheckout(productDetails)

        fetch(
            `https://sellphone-server-mehedi2283.vercel.app/all-products/${id}`
        )
            .then((res) => res.json())
            .then((data) => setProductDetails(data));

        console.log(id);
    };
    console.log(productDetails);

    return (
        <div>
            <p className="text-4xl text-center font-bold">
                {/* {brandsProducts[0].category_name} has total {brandsProducts.length}{" "} */}
                products.
            </p>

            <div className="grid lg:grid-cols-3 justify-items-center mt-4">
                {brandsProducts.map((product) => (
                    <ProductCard
                        handleProductDetails={handleProductDetails}
                        setProductDetails={setProductDetails}
                        productDetails={{ productDetails }}
                        key={product._id}
                        product={product}
                        refetch={refetch}
                        // checkout={checkout}
                        // setCheckout={setCheckout}
                    ></ProductCard>
                ))}
            </div>
        </div>
    );
};

export default EntryLevel;
