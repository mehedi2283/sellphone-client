import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise);

const Payment = () => {
    const paymentData = useLoaderData();
    const navigation = useNavigation()

    console.log('helllooo',paymentData);
    if(navigation.state === "loading"){
        return(
            <div className="border my-72  border-primary/90 shadow rounded-md p-4 max-w-sm w-full mx-auto  ">
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
        )
    }
    return (
        <>
            <div>
                <h1 className=" text-center text-2xl font-medium lg:-translate-x-48">
                    Payment for {paymentData.model}
                </h1>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm paymentData={paymentData}></CheckoutForm>
                </Elements>
            </div>
        </>
    );
};

export default Payment;
