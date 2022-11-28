import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import Buyers from "./Buyers";

const AllUsers = () => {
    const [deletingSellers, setDeletingSellers] = useState(null);
    // const [deletingBuyers, setDeletingbuyers] = useState(null);

    const closeModal = () => {
        setDeletingSellers(null);
    };

    const handleDeleteSeller = (user) => {
        // console.log(seller);

        fetch(
            ` https://sellphone-server-mehedi2283.vercel.app/users/${user._id}`,
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
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Deleted ${user.name} seccessfully `);
                    refetch();
                }
            });
    };

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const res = await fetch(
                " https://sellphone-server-mehedi2283.vercel.app/users-sellers"
            );
            const data = await res.json();
            return data;
        },
    });

    const handleVerified = (id) => {
        fetch(
            ` https://sellphone-server-mehedi2283.vercel.app/users-sellers/isVerified/${id}`,
            {
                method: "PUT",
                headers: {
                    authorization: `bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Verified this seller");
                    refetch();
                }
            });

        console.log(id);
    };

    return (
        <div>
            <h1 className="text-4xl mb-20 font-bold text-center">All users</h1>
            <div className="grid md:grid-cols-2 gap-2">
                <section>
                    <p className="text-center text-3xl font-bold">Sellers</p>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellers.map((seller, i) => (
                                    <tr key={seller._id}>
                                        {console.log(seller)}
                                        <th>{i + 1}</th>
                                        <td>{seller.name}</td>
                                        <td>{seller.email}</td>
                                        <td>
                                            {seller.isVerified !==
                                                "verified" && (
                                                <button
                                                    onClick={() =>
                                                        handleVerified(
                                                            seller._id
                                                        )
                                                    }
                                                    className="btn normal-case  btn-primary btn-xs "
                                                >
                                                    Make Verified
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <label
                                                onClick={() =>
                                                    setDeletingSellers(seller)
                                                }
                                                htmlFor="confirmation-modal"
                                                className=" btn normal-case bg-red-700 border-0 btn-xs "
                                            >
                                                Delete
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {deletingSellers && (
                        <ConfirmationModal
                            title={`Are you sure you want to delete ?`}
                            message={` ${deletingSellers.name} will be deleted.`}
                            closeModal={closeModal}
                            successAction={handleDeleteSeller}
                            successButtonName="Delete"
                            modalData={deletingSellers}
                        ></ConfirmationModal>
                    )}
                </section>
                <section>
                    <p className="text-center text-3xl font-bold">Buyers</p>
                    <Buyers handleDeleteSeller={handleDeleteSeller}></Buyers>
                </section>
            </div>
        </div>
    );
};

export default AllUsers;
