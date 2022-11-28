import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ProductCardForSeller from "./../../ProductCard/ProductCardForSeller";
import useTitle from "../../../hooks/useTitle";

const MyProducts = () => {
    useTitle("MY Products");
    const { user } = useContext(AuthContext);

    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const res = await fetch(
                `https://sellphone-server-mehedi2283.vercel.app/myProducts?email=${user?.email}`,
                {
                    headers: {
                        authorization: `bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            const data = await res.json();
            return data;
        },
    });

    console.log(myProducts);
    return (
        <div>
            <p className="text-center text-3xl font-bold mb-9">
                My total products: {myProducts.length}
            </p>
            <div className=" grid lg:grid-cols-3 md:grid-cols-2">
                {myProducts.map((product) => (
                    <ProductCardForSeller
                        key={product._id}
                        product={product}
                        refetch={refetch}
                    ></ProductCardForSeller>
                ))}
            </div>
        </div>
    );
};

export default MyProducts;
