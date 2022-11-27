import React, { useContext } from "react";
import { GoUnverified, GoVerified } from "react-icons/go";
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
            <h2 className="text-2xl font-bold  text-center">{name}</h2>
                <p className="text-center text-base font-medium">Location: {location}</p>
                <div className="flex ">
                    <p className="text-center text-base font-medium w-1/2">
                        Resale Price: {resale_price} tk
                    </p>
                    <p className="text-center text-base font-medium w-1/2">
                        Original Price: {original_price} tk
                    </p>
                </div>
                <div className="flex ">
                    <p className="text-center text-base font-medium w-1/2">
                        Years of use: {years_of_use} years
                    </p>
                    <p className="text-center text-base font-medium w-1/2">
                        Post date: {posted_time}{" "}
                    </p>
                </div>
                <div className="flex justify-center gap-2 items-center">
                <h2 className="text-center text-lg font-bold uppercase">
                       <span className="normal-case"> Sellers Name</span>: {seller_name}{" "}
                    </h2>
                    {!isVerified ? (
                        <GoUnverified className="text-xl"></GoUnverified>
                    ) : (
                        <GoVerified className="text-xl text-blue-500" ></GoVerified>
                    )}
                </div>
                <p className="divider text-lg font-semibold">Status</p>
                <div className="flex justify-around">
                    <button className="btn btn-outline border-0 hover:bg-green-600 text-green-600 bg-green-200">Available</button>
                    <button className="btn btn-outline border-0 hover:bg-red-600 text-red-600 bg-red-200">Delete</button>
                </div>
                
            </div>
        </div>
    );
};

export default ProductCardForSeller;
