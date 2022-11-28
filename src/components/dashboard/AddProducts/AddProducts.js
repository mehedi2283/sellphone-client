import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import useSellerVerified from "../../../hook/useSellerAdmin";
import useTitle from "../../../hooks/useTitle";
import useSeller from "./../../../hook/useSeller";

const AddProducts = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    useTitle("Add Product");
    const [sellerVerified, isSellerLoadingrVerified] = useSellerVerified(
        user?.email
    );
    // const [isSeller] = useSeller(user?.email);
    console.log("verified seller", sellerVerified);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const category_name = form.category_name.value;
        const model_name = form.model_name.value;
        const condition = form.condition.value;
        const picture = form.picture.value;
        const location = form.location.value;
        const resale_price = form.resale_price.value;
        const original_price = form.original_price.value;
        const year_of_purchase = form.year_of_purchase.value;
        const years_of_use = form.years_of_use.value;
        const posted_time = form.posted_time.value;
        const seller_name = form.seller_name.value;
        const number = form.number.value;
        const email = form.email.value;
        const details = form.details.value;

        const product = {
            category_name,
            email,
            model_name,
            condition,
            picture,
            location,
            resale_price,
            original_price,
            year_of_purchase,
            years_of_use,
            posted_time,
            seller_name,
            number,
            details,
            ratings: "5",
            isVerified: sellerVerified,
        };

        fetch("https://sellphone-server-mehedi2283.vercel.app/add-products", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("Product added successfully.");
                    console.log("sellerrrrrrrrrrrrrrrr:", sellerVerified);
                    form.reset();
                    navigate("/dashboard/myProducts");
                }
            })
            .catch((err) => console.error(err));
    };

    if (isSellerLoadingrVerified) {
        <h1 className="text-6xl">Loading................</h1>;
    }

    return (
        <div className="w-1/2 add-service-form mx-auto rounded-lg border border-primary mt-20">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center text-3xl font-bold my-4 text-primary ">
                    Add a service
                </h3>
                <div className="my-auto w-10/12 mx-auto">
                    <div className="grid grid-cols-1 my-auto  gap-4 w-full">
                        <select
                            name="category_name"
                            className="select border-opacity-20 select-primary bg-primary/5 focus:bg-primary/10  w-full   focus:outline-0 focus:border-primary focus:text-primary"
                        >
                            <option disabled selected>
                                Select Category
                            </option>
                            <option>Low Budget</option>
                            <option>Entry Level</option>
                            <option>High Budget</option>
                        </select>
                        {/* <input
                            required
                            name="brand_name"
                            type="text"
                            placeholder="Brand Name"
                            className="input bg-primary/5 focus:bg-primary/10 input-bordered w-full   focus:outline-0 focus:border-primary focus:text-primary "
                        /> */}
                        <input
                            required
                            name="model_name"
                            type="text"
                            placeholder="Model Name"
                            className="input bg-primary/5 focus:bg-primary/10 input-bordered w-full   focus:outline-0 focus:border-primary focus:text-primary "
                        />

                        <input
                            required
                            name="condition"
                            type="text"
                            placeholder="Condition Type (excellent, good, fair)"
                            className="input input-bordered w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="picture"
                            type="text"
                            required
                            placeholder="Image Link"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="location"
                            type="text"
                            required
                            placeholder="Location"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="resale_price"
                            type="number"
                            required
                            placeholder="Resale Price"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="original_price"
                            type="text"
                            required
                            placeholder="Original Price"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="year_of_purchase"
                            type="text"
                            required
                            placeholder="Purchase Date"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="years_of_use"
                            type="text"
                            required
                            placeholder="How many years of use"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="posted_time"
                            type="text"
                            required
                            placeholder="Give todays date"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="seller_name"
                            type="text"
                            required
                            placeholder="Your Name"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="email"
                            defaultValue={user.email}
                            readOnly="true"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                        <input
                            name="number"
                            type="text"
                            required
                            placeholder="Your Phone Numer"
                            className="input input-bordered  w-full focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary"
                        />
                    </div>

                    <textarea
                        name="details"
                        required
                        className="textarea textarea-bordered w-full  mt-4 h-40 focus:bg-primary/10 bg-primary/5  focus:outline-0 focus:border-primary focus:text-primary "
                        placeholder="Write details about this service."
                    ></textarea>
                </div>
                <div className="flex  justify-center mb-4 mt-3">
                    <input
                        type="submit"
                        value="Add service"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
