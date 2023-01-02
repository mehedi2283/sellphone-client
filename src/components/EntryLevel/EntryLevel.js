import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";
import ProductCard from "../ProductCard/ProductCard";

const EntryLevel = () => {
    useTitle("Entry Level");
    const { search } = useContext(AuthContext);
    const { data: brandsProducts = [], refetch,isLoading } = useQuery({
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

    if(isLoading){
        return (
            <div className="border my-72 border-primary shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
            <p className="text-4xl text-center font-bold">
                {brandsProducts[0].category_name} has total {brandsProducts.length}{" "}
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
