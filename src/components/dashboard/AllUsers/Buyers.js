import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";

const Buyers = () => {
    const [deletingBuyers, setDeletingbuyers] = useState(null);

    const closeModal = () => {
        setDeletingbuyers(null);
    };

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ["buyers"],
        queryFn: async () => {
            const res = await fetch(
                "sellphone-server-mehedi2283.vercel.app/users-buyers"
            );
            const data = await res.json();
            return data;
        },
    });

    console.log(deletingBuyers);
    const handleDeleteBuyers = (user) => {
        console.log(user);

        fetch(`sellphone-server-mehedi2283.vercel.app/users/${user._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success(`Deleted ${user.name} seccessfully `);
                refetch();
            });
    };

    // refetch()
    // console.log(buyers);
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {buyers.map((buyer, i) => (
                        <tr key={buyer._id}>
                            <th>{i + 1}</th>
                            <td>{buyer.name}</td>
                            <td>{buyer.email}</td>

                            <td>
                                <label
                                    onClick={() => setDeletingbuyers(buyer)}
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
            {deletingBuyers && (
                <ConfirmationModal
                    title={`Are you sure you want to delete ?`}
                    message={` ${deletingBuyers.name} will be deleted.`}
                    closeModal={closeModal}
                    successAction={handleDeleteBuyers}
                    successButtonName="Delete"
                    modalData={deletingBuyers}
                ></ConfirmationModal>
            )}
        </div>
    );
};

export default Buyers;
