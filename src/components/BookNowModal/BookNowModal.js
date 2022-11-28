import toast from "react-hot-toast";

const OrderModal = ({
    checkout,
    setCheckout,
    user,
    id,
    productDetails,
    refetch,
}) => {
    // Checkout is just another name of appointmentOptions with name, slots, _id
    // const { name, slots } = checkout;

    const { model_name, resale_price, picture, _id } =
        productDetails.productDetails;

    console.log(resale_price);

    const handleOrder = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const model = form.model.value;

        const phone = form.phone.value;
        const location = form.location.value;
        // [3, 4, 5].map((value, i) => console.log(value))
        const order = {
            name,
            email,
            model,
            resalePrice: resale_price,
            phone,
            location,
            picture,
        };

        console.log(order);

        fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                // authorization: `Bearer ${localStorage.getItem("tourDE-token")}`,
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.acknowledged) {
                    form.reset();

                    fetch(`http://localhost:5000/all-products/disable/${_id}`, {
                        method: "PUT",
                        headers: {
                            authorization: `bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.modifiedCount > 0) {
                                toast.success("Order Placed Successfully");
                                refetch();
                            }
                        });

                    // console.log(id);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="order-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-xl font-bold text-center">
                        Confirm Order
                    </h3>
                    <form onSubmit={handleOrder} className="grid grid-cols-1 ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            name="name"
                            value={user?.displayName}
                            readOnly
                            type="text"
                            placeholder="Your Name"
                            className="input w-full input-bordered"
                        />
                        <br />
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            value={user?.email}
                            readOnly
                            type="email"
                            placeholder="Email Address"
                            className="input w-full input-bordered"
                        />
                        <br />
                        <label className="label">
                            <span className="label-text">Model</span>
                        </label>
                        <input
                            name="model"
                            type="text"
                            readOnly
                            value={model_name}
                            //   placeholder="Phone Number"
                            className="input w-full input-bordered"
                        />
                        <br />
                        <label className="label">
                            <span className="label-text">Resale Price</span>
                        </label>
                        <input
                            readOnly
                            name="resale_price"
                            type="text"
                            value={`${resale_price} tk`}
                            className="input w-full input-bordered"
                        />
                        <br />
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            name="phone"
                            type="number"
                            placeholder="Phone Number"
                            required
                            className="input w-full input-bordered"
                        />
                        <br />
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input
                            name="location"
                            required
                            type="text"
                            placeholder="location"
                            className="input w-full input-bordered"
                        />
                        <br />
                        <button type="submit" className="mt-4">
                            <label
                                className="font-black h-8 m-0 cursor-pointer flex justify-center items-center btn btn-primary w-full"
                                htmlFor="order-modal"
                            >
                                Place Order{" "}
                            </label>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default OrderModal;
