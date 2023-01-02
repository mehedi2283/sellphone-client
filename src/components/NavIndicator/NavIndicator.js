import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const NavIndicator = () => {
    const { setTotalAll, setTotalLow, setTotalEntry, setTotalHigh } =
        useContext(AuthContext);

    // console.log(setTotalLow, setTotalEntry, setTotalHigh);

    const { data: allProductscollection = [], refetch } = useQuery({
        queryKey: ["sellers1"],
        queryFn: async () => {
            const res = await fetch(
                ` https://sellphone-server-mehedi2283.vercel.app/all-products`
            );
            const data = await res.json();
            setTotalAll(allProductscollection.length);
            return data;
        },
    });
    refetch();

    {
        const { data: brandsProducts = [], refetch } = useQuery({
            queryKey: ["sellers2"],
            queryFn: async () => {
                const res = await fetch(
                    `https://sellphone-server-mehedi2283.vercel.app/productsByBrand/High Budget`
                );
                const data = await res.json();
                console.log("hello");
                setTotalHigh(brandsProducts.length);
                return data;
            },
        });
        refetch();
    }

    {
        const { data: brandsProducts2 = [], refetch } = useQuery({
            queryKey: ["sellers3"],
            queryFn: async () => {
                const res = await fetch(
                    `https://sellphone-server-mehedi2283.vercel.app/productsByBrand/Low Budget`
                );
                const data = await res.json();
                setTotalLow(brandsProducts2.length);
                return data;
            },
        });
        refetch();
    }

    {
        const { data: brandsProducts3 = [], refetch } = useQuery({
            queryKey: ["sellers4"],
            queryFn: async () => {
                const res = await fetch(
                    `https://sellphone-server-mehedi2283.vercel.app/productsByBrand/Entry Level`
                );
                const data = await res.json();
                setTotalEntry(brandsProducts3.length);
                return data;
            },
        });
        refetch();
    }
    return <div></div>;
};

export default NavIndicator;
