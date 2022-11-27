import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const paymentData = useLoaderData()

    console.log(paymentData);
    return (
        <div>
            payment comming soooooooooon
        </div>
    );
};

export default Payment;