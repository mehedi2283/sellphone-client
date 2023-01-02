import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoUnverified, GoVerified } from "react-icons/go";
import OrderModal from "../BookNowModal/BookNowModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { AuthContext } from "./../../context/AuthProvider/AuthProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCardForSeller = ({ product, refetch }) => {
    const { user } = useContext(AuthContext);

    // const [deletingProduct, setDeletingProduct] = useState(null);
    const [clickedId, setClickedId] = useState(null);
    const getId = (id) => {
        setClickedId(id);
    };
    console.log(product);

    const closeModal = () => {
        setClickedId(null);

        console.log("clicked");
        console.log("wow", clickedId);
    };

    const {
        _id,
        email,
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

    const [perProductUser, setPerProductUser] = useState({});
    useEffect(() => {
        fetch(
            `https://sellphone-server-mehedi2283.vercel.app/users?email=${email}`
        )
            .then((res) => res.json())
            .then((data) => setPerProductUser(data));
    }, [email]);

    //picture, name, location, resale price, original price, years of use, the time when it got posted, the seller's name; if the seller is verified, there will be a blue tick next to their name and a Book now button.

    const handleSellerProductDelete = (id) => {
        // console.log();

        fetch(
            `https://sellphone-server-mehedi2283.vercel.app/sellerProduct/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                toast.success(`Deleted ${model_name} seccessfully `);
                refetch();
            });
    };

    const advertiseProduct = {
        _id,
        email,
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
        console.log(product);

        fetch(
            `https://sellphone-server-mehedi2283.vercel.app/advertise/${product._id}`,
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
        <>
            <div
                data-aos="fade-up"
                className="boxShadow rounded-md card card-compact w-80  my-14 border border-primary/50 bg-primary/5 "
            >
                <figure>
                    <LazyLoadImage
                        effect="blur"
                        className="m-4 rounded-md"
                        src={picture}
                        alt={model_name}
                        style={{
                            height: "20vh",
                            objectFit: "cover",
                            width: "full",
                        }}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="text-2xl font-bold  text-center">
                        {model_name}
                    </h2>
                    <p className="text-center text-base font-medium">
                        Location: {location}
                    </p>
                    <hr />
                    <div className="flex ">
                        <p className="text-center text-base font-medium w-1/2">
                            Resale Price: <br /> ${resale_price}
                        </p>
                        <p className="text-center text-base font-medium w-1/2">
                            Original Price: <br /> ${original_price}
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
                        {!perProductUser.isVerified === "verified" ? (
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
                                className="btn btn-outline border-0 hover:bg-green-600 text-green-600 bg-green-200/20"
                            >
                                Available
                            </button>
                        )}
                        <label
                            onClick={() => getId(_id)}
                            htmlFor="confirmation-modal"
                            className="btn btn-outline border-0 hover:bg-red-600 text-red-600 bg-red-200/20"
                        >
                            Delete
                        </label>
                    </div>
                </div>
            </div>
            <div className=" absolute">
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
        </>
    );
};

export default ProductCardForSeller;
