import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ paymentData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [transactionID, setTransactionID] = useState("");
    const [processing, setProcessing] = useState(false);

    const { resalePrice, name, email } = paymentData;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resalePrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("[error]", error);
            setCardError(error.message);
        } else {
            setCardError("");
            console.log("[PaymentMethod]", paymentMethod);
        }

        setSuccess("");
        setProcessing(true)
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            });

        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false)
            return;
        }
        if (paymentIntent.status === "succeeded") {
            setSuccess("Payment complete.");
            setTransactionID(paymentIntent.id);
            toast.success("Payment Complete");
        }
        setProcessing(false)
        //   console.log(paymentIntent)
    };

    return (
        <form
            className=" mx-10 mt-9 lg:mx-96 border py-40 lg:-translate-x-36"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-evenly ">
                <CardElement
                    className="w-1/3"
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-sm "
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </div>
            <h2 className="text-center text-2xl text-red-500 mt-9">
                {cardError}
            </h2>
            {
                success && <div className="text-center text-2xl pt-9">
                    <p className="text-green-500 mb-4 font-bold text-4xl">{success}</p>
                    <p>Your transactionId: <span className="font-bold">{transactionID}</span></p>
                </div>
                
            }
        </form>
    );
};

export default CheckoutForm;
