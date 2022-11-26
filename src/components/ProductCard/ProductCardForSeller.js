import React, { useContext } from "react";
import OrderModal from "../BookNowModal/BookNowModal";
import { AuthContext } from "./../../context/AuthProvider/AuthProvider";

const ProductCardForSeller = ({
    product,
   
}) => {
    const { user } = useContext(AuthContext);

    const {
        picture,
        model_name: name,
        location,
        resale_price,
        original_price,
        years_of_use,
        posted_time,
        seller_name,
        isVerified,
    } = product;

    //picture, name, location, resale price, original price, years of use, the time when it got posted, the seller's name; if the seller is verified, there will be a blue tick next to their name and a Book now button.

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl mb-6">
            <figure>
                <img src={picture} alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="text-2xl font-bold text-center">{name}</h2>
                <p className="text-center">{location}</p>
                <div className="flex ">
                    <p className="text-center w-1/2">
                        Resale Price: {resale_price} tk
                    </p>
                    <p className="text-center w-1/2">
                        Original Price: {original_price} tk
                    </p>
                </div>
                <div className="flex ">
                    <p className="text-center w-1/2">
                        Years of use: {years_of_use} years
                    </p>
                    <p className="text-center w-1/2">
                        Post date: {posted_time}{" "}
                    </p>
                </div>
                <div className="flex ">
                    <p className="text-center w-1/2">
                        Sellers Name: {seller_name}{" "}
                    </p>
                    {isVerified ? (
                        <p className="text-center w-1/2 ">verified </p>
                    ) : (
                        <p className="text-center w-1/2">not verified </p>
                    )}
                </div>
                
            </div>
        </div>
    );
};

export default ProductCardForSeller;
