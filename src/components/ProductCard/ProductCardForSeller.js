import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GoUnverified, GoVerified } from "react-icons/go";
import OrderModal from "../BookNowModal/BookNowModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { AuthContext } from "./../../context/AuthProvider/AuthProvider";

const ProductCardForSeller = ({ product, refetch }) => {
    const { user } = useContext(AuthContext);

    // const [deletingProduct, setDeletingProduct] = useState(null);
    const [clickedId, setClickedId] = useState(null);
    const getId = (id) => {
        setClickedId(id);
    };
    console.log("set id", clickedId);

    const closeModal = () => {
        setClickedId(null);

        console.log("clicked");
        console.log("wow", clickedId);
    };

    const {
        _id,
        picture,
        model_name,
        location,
        resale_price,
        original_price,
        years_of_use,
        posted_time,
        seller_name,
        isVerified,
        isBooked,
        details,
    } = product;

    //picture, name, location, resale price, original price, years of use, the time when it got posted, the seller's name; if the seller is verified, there will be a blue tick next to their name and a Book now button.

    const handleSellerProductDelete = (id) => {
        // console.log();

        fetch(`sellphone-server-mehedi2283.vercel.app/sellerProduct/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success(`Deleted ${model_name} seccessfully `);
                refetch();
            });
    };

    const advertiseProduct = {
        _id,
        picture,
        model_name,
        location,
        resale_price,
        original_price,
        years_of_use,
        posted_time,
        seller_name,
        isVerified,
        isBooked,
        details,
    };

    const handleAdvertise = (product) => {
        // console.log(product);

        fetch(
            `sellphone-server-mehedi2283.vercel.app/advertise/${product._id}`,
            {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
                body: JSON.stringify(advertiseProduct),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success("Advertisement Complete");
                    refetch();
                }
            });
    };

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl mb-6">
            <figure>
                <img src={picture} alt={model_name} />
            </figure>
            <div className="card-body">
                <h2 className="text-2xl font-bold  text-center">
                    {model_name}
                </h2>
                <p className="text-center text-base font-medium">
                    Location: {location}
                </p>
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
                        <span className="normal-case"> Sellers Name</span>:{" "}
                        {seller_name}{" "}
                    </h2>
                    {!isVerified ? (
                        <GoUnverified className="text-xl"></GoUnverified>
                    ) : (
                        <GoVerified className="text-xl text-blue-500"></GoVerified>
                    )}
                </div>
                <p className="divider text-lg font-semibold">Status</p>
                <div className="flex justify-around">
                    {isBooked === "booked" ? (
                        <button
                            disabled
                            className="btn  btn-outline border-0 hover:bg-green-600 text-green-600 bg-green-200"
                        >
                            Booked
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAdvertise(product)}
                            className="btn btn-outline border-0 hover:bg-green-600 text-green-600 bg-green-200"
                        >
                            Available
                        </button>
                    )}
                    <label
                        onClick={() => getId(_id)}
                        htmlFor="confirmation-modal"
                        className="btn btn-outline border-0 hover:bg-red-600 text-red-600 bg-red-200"
                    >
                        Delete
                    </label>
                </div>
            </div>
            {clickedId && (
                <ConfirmationModal
                    title={`Are you sure you want to delete ?`}
                    message={` ${model_name} will be deleted.`}
                    closeModal={closeModal}
                    successAction={handleSellerProductDelete}
                    successButtonName="Delete"
                    modalData={clickedId}
                ></ConfirmationModal>
            )}
        </div>
    );
};

export default ProductCardForSeller;
