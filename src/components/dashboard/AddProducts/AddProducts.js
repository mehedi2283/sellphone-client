import React, { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import useSellerVerified from "../../../hook/useSellerAdmin";
import useTitle from "../../../hooks/useTitle";
// import useSeller from "./../../../hook/useSeller";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import {
    Input,
    Option,
    // Radio,
    Select,
    Textarea,
} from "@material-tailwind/react";

const AddProducts = () => {
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostKey);
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
        const category_name = value1;
        const model_name = form.model_name.value;
        const condition = value;
        const picture = form.picture.files[0];
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
        console.log(picture);

        const formData = new FormData();
        formData.append("image", picture);
        console.log(formData);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgData) => {
                console.log(imgData);
                if (imgData.success) {
                    const product = {
                        category_name,
                        email,
                        model_name,
                        condition,
                        picture: imgData.data.url,
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
                    console.log(product.picture);

                    fetch(
                        "https://sellphone-server-mehedi2283.vercel.app/add-products",
                        {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(product),
                        }
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.acknowledged) {
                                toast.success("Product added successfully.");
                                console.log(
                                    "sellerrrrrrrrrrrrrrrr:",
                                    sellerVerified
                                );
                                form.reset();
                                navigate("/dashboard/myProducts");
                            }
                        })
                        .catch((err) => console.error(err));
                }
            });
    };
    const range = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (_, i) => start + i * step
        );

    const [startDate, setStartDate] = useState(new Date());
    // const [startDate2, setStartDate2] = useState(new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [value1, setValue1] = useState(null);

    const handleCategory = (value) => {
        console.log("value:", setValue1(value));
    };

    const [value, setValue] = useState(null);

    const handleCondition = (value) => {
        console.log("value:", setValue(value));
    };

    if (isSellerLoadingrVerified) {
        <h1 className="text-6xl">Loading................</h1>;
    }

    return (
        <div className="w-1/2 mt-9 lg:-translate-x-48 add-service-form mx-auto rounded-lg border border-primary">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center text-3xl font-bold my-4 text-primary ">
                    Add a Product
                </h3>
                <div className="my-auto w-10/12 mx-auto">
                    <div className="grid grid-cols-1 my-auto  gap-4 w-full">
                        <Input
                            required
                            color="teal"
                            name="model_name"
                            type="text"
                            label="Model Name"
                            className="input  w-full   focus:outline-0  focus:text-teal-500 "
                        />
                        <Select
                            onChange={handleCategory}
                            name="category_name"
                            className=""
                            color="teal"
                            label="Select Category"
                        >
                            <Option value="Low Budget">Low Budget</Option>
                            <Option value="Entry Level">Entry Level</Option>
                            <Option value="High Budget">High Budget</Option>
                        </Select>

                        <Select
                            onChange={handleCondition}
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 25 },
                            }}
                            name="condition"
                            color="teal"
                            label="Select Condition"
                        >
                            <Option value="Excelent">Excelent</Option>
                            <Option value="Good">Good</Option>
                            <Option value="Fair">Fair</Option>
                        </Select>

                        <div className="flex gap-2 items-center">
                            <input
                                name="picture"
                                type="file"
                                required
                                className="file-input-md file-input-accent file-input-bordered file-input focus:outline-none border-gray-400 focus:border-teal-500 w-full"
                            />
                            <Input
                                color="teal"
                                size="lg"
                                name="location"
                                type="text"
                                required
                                label="Location"
                                className="input input-bordered  w-full   focus:outline-0 focus:text-primary"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Input
                                color="teal"
                                required
                                type="number"
                                name="resale_price"
                                size="lg"
                                label="Resale Price"
                                className="w-full  focus:text-teal-500 text-primary/70"
                            />
                            <Input
                                color="teal"
                                required
                                type="number"
                                name="original_price"
                                size="lg"
                                label="Original Price"
                                className="w-full  focus:text-teal-500 text-primary/70"
                            />
                        </div>
                        <div className="flex justify-between gap-2">
                            {/* <input
                                name="year_of_purchase"
                                type="text"
                                required
                                placeholder="Purchase Date"
                                className="input input-bordered  w-full   focus:outline-0 focus:border-primary focus:text-primary"
                            />
                            <input
                                name="years_of_use"
                                type="text"
                                required
                                placeholder="How many years of use"
                                className="input input-bordered  w-full   focus:outline-0 focus:border-primary focus:text-primary"
                            /> */}

                            <div className="w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Buying Date
                                    </span>
                                </label>

                                <ReactDatePicker
                                    className="border p-3  border-primary/20 w-full bg-base-100  focus:outline-0 focus:border-teal-500 focus:text-teal-500"
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                    }) => (
                                        <div
                                            style={{
                                                margin: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                onClick={decreaseMonth}
                                                disabled={
                                                    prevMonthButtonDisabled
                                                }
                                            >
                                                {"<"}
                                            </button>
                                            <select
                                                value={getYear(date)}
                                                onChange={({
                                                    target: { value },
                                                }) => changeYear(value)}
                                            >
                                                {years.map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                value={months[getMonth(date)]}
                                                onChange={({
                                                    target: { value },
                                                }) =>
                                                    changeMonth(
                                                        months.indexOf(value)
                                                    )
                                                }
                                            >
                                                {months.map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                onClick={increaseMonth}
                                                disabled={
                                                    nextMonthButtonDisabled
                                                }
                                            >
                                                {">"}
                                            </button>
                                        </div>
                                    )}
                                    selected={startDate}
                                    name="year_of_purchase"
                                    onChange={(date) => setStartDate(date)}
                                />
                            </div>

                            <div className="w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Product Uses Duration
                                    </span>
                                </label>
                                <input
                                    name="years_of_use"
                                    type="number"
                                    required
                                    placeholder="Years"
                                    className="input input-bordered rpunded-0  w-full   focus:outline-0 focus:border-teal-500 focus:text-teal-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="form-control w-full ">
                                <Input
                                    color="teal"
                                    name="seller_name"
                                    size="lg"
                                    label=" Seller's Name"
                                    defaultValue={user.displayName}
                                    readOnly="true"
                                    type=""
                                    className="w-full    focus:text-teal-500 text-primary/70"
                                />
                            </div>

                            <div className="form-control w-full ">
                                <Input
                                    color="teal"
                                    size="lg"
                                    label=" Seller's Email"
                                    name="email"
                                    defaultValue={user.email}
                                    readOnly="true"
                                    className="w-full   focus:text-teal-500 text-primary/70"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {/* <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">
                                        Seller's Number
                                    </span>
                                </label>
                                <input
                                    placeholder="Your Phone Numer"
                                    className="input input-bordered  w-full   focus:outline-0 focus:border-primary focus:text-primary"
                                />
                            </div> */}
                            <Input
                                color="teal"
                                className="  w-full  focus:text-teal-500 text-primary/70"
                                name="number"
                                type="number"
                                size="lg"
                                required
                                variant="outlined"
                                label="Seller's Number"
                            />

                            <Input
                                color="teal"
                                className="  w-full   focus:text-teal-500 text-primary/70"
                                name="posted_time"
                                size="lg"
                                readOnly
                                defaultValue={
                                    new Date().toLocaleDateString() + ""
                                }
                                variant="outlined"
                                label="Posting Date"
                            />

                            {/* <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">
                                        Posting Date
                                    </span>
                                </label>
                                <input
                                    name="posted_time"
                                    type="text"
                                    readOnly
                                    defaultValue={
                                        new Date().toLocaleDateString() + ""
                                    }
                                    className="input input-bordered  w-full   focus:outline-0 focus:border-primary focus:text-primary"
                                />
                            </div> */}
                        </div>
                    </div>

                    <div className="form-control w-full mt-4">
                        <Textarea
                            name="details"
                            color="teal"
                            label="Details"
                            className="  w-full   focus:text-teal-500 text-primary/70"
                        />
                    </div>
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
