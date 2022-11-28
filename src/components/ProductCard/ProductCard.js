import React, { useContext, useEffect, useState } from "react";
import OrderModal from "../BookNowModal/BookNowModal";
import { AuthContext } from "./../../context/AuthProvider/AuthProvider";
import useBuyer from "./../../hook/useBuyer";
import { GoUnverified, GoVerified } from "react-icons/go";

const ProductCard = ({
    product,
    // setCheckout,
    checkout,
    productDetails,
    handleProductDetails,
    refetch,
    isLoading,
}) => {
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    // console.log(isBuyer)

    const {
        picture,
        email,
        model_name: name,
        location,
        resale_price,
        original_price,
        years_of_use,
        posted_time,
        seller_name,
        // isVerified,
        isBooked,
    } = product;

    const [perProductUser, setPerProductUser] = useState({});
    useEffect(() => {
        fetch(
            `https://sellphone-server-mehedi2283.vercel.app/users?email=${email}`
        )
            .then((res) => res.json())
            .then((data) => setPerProductUser(data));
    }, [email]);
    console.log(name, perProductUser.isVerified === "verified");

    //picture, name, location, resale price, original price, years of use, the time when it got posted, the seller's name; if the seller is verified, there will be a blue tick next to their name and a Book now button.

    // if(isLoading){
    //     return(
    //         <h1>loading</h1>

    //     )
    // }

    return (
        <div className="card card-compact w-96  bg-base-100 shadow-xl mb-6">
            <figure>
                <img src={picture} alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="text-2xl font-bold  text-center">{name}</h2>
                <p className="text-center text-base font-medium">
                    Location: {location}
                </p>
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
                    {perProductUser.isVerified === "verified" ? (
                        <GoVerified className="text-xl text-blue-500"></GoVerified>
                    ) : (
                        <GoUnverified className="text-xl"></GoUnverified>
                    )}
                </div>
                <div className=" card-actions">
                    <label
                        onClick={() => handleProductDetails(product._id)}
                        htmlFor="order-modal"
                        className={`  ${
                            isBuyer === false || isBooked === "booked"
                                ? "btn-disabled btn btn-primary w-full"
                                : "btn btn-primary w-full"
                        } `}
                    >
                        {` ${
                            isBuyer === false || isBooked === "booked"
                                ? "Not Available"
                                : " Book Now"
                        }`}
                    </label>

                    <OrderModal
                        productDetails={productDetails}
                        // setCheckout={setCheckout}
                        id={product._id}
                        user={user}
                        refetch={refetch}
                    ></OrderModal>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
