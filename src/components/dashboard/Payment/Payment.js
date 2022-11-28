import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise);

const Payment = () => {
    const paymentData = useLoaderData();

    console.log('helllooo',paymentData);
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
