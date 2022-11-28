import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import useTitle from "../../../hooks/useTitle";

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    // const uri = `sellphone-server-mehedi2283.vercel.app/orders?email=${user?.email}`

    useTitle("MY Orders");
    const { data: orders = [] } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const res = await fetch(
                `sellphone-server-mehedi2283.vercel.app/orders?email=${user?.email}`,
                {
                    headers: {
                        authorization: `bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            const data = await res.json();
            return data;
        },
    });

    // console.log(orders);

    return (
        <div>
            <h1 className="text-3xl text-center  mb-9 font-bold">My Orders</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <td></td>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {orders.map((order, i) => (
                            <tr key={order._id}>
                                {/* {console.log(order)} */}

                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={order.picture}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {order.model}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost font-bold">
                                        $ {order.resalePrice}
                                    </span>
                                </td>

                                <td>
                                    {order.resalePrice && !order.paid && (
                                        <Link
                                            to={`/dashboard/payment/${order._id}`}
                                            className="btn btn-ghost font-bold px-3 bg-blue-200 hover:bg-blue-500 hover:text-white btn-xs"
                                        >
                                            Pay
                                        </Link>
                                    )}

                                    {order.resalePrice && order.paid && (
                                        <Link className="btn text-white btn-xs btn-disabled  bg-green-500">
                                            Paid
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
