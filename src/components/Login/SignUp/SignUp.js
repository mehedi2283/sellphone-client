import React, { useState } from "react";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import useToken from "../../../hook/useToken";

const SignUp = () => {
    useTitle("SignUp");
    const [createdUserEmail, setCreatedUserEmail] = useState("");
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    if (token) {
        navigate("/sign_in");
    }

    const { loading } = useContext(AuthContext);
    const [error, setError] = useState("");
    const { createUser, updateUserProfile, logOut, setLoading } =
        useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.pass.value;
        const role = form.role.value;
        // console.log(role);

        createUser(email, password)
            .then((result) => {
                setError(" ");
                form.reset();

                handleProfile(name, photoURL, role, email);
            })
            .catch((e) => {
                setLoading(false);

                setError(e.message);
            });
    };

    const handleProfile = (name, photoURL, role, email) => {
        const profile = {
            displayName: name,
            photoURL: photoURL,
        };

        updateUserProfile(profile)
            .then(() => {})
            .catch(() => {});

        const user = {
            name,
            email,
            role,
            isVerified: "not verifed",
        };
        fetch("https://sellphone-server-mehedi2283.vercel.app/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.acknowledged) {
                    // form.reset();
                    logOut();
                    toast.success("Registration Complete");
                    toast.success("Login Now");

                    // getUserToken(email)
                    setCreatedUserEmail(email);
                }
            })
            .catch((err) => console.log(err));
    };

    // const getUserToken = email => {
    //     fetch(`https://sellphone-server-mehedi2283.vercel.app/jwt?email=${email}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data)
    //         if(data.accessToken){

    //             localStorage.setItem('accessToken',data.accessToken)
    //             navigate("/sign_in");
    //         }
    //     })
    // }

    // const saveUser = (name,email,role)=>{
    //   const user = {
    //     name,
    //     email,
    //     role
    //   }
    //   console.log(user)

    // }

    if (loading) {
        return (
            <div className="border my-72 border-primary/90 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
        );
    }

    return (
        <div className=" mx-auto mb-4 ">
            <div className="hero  ">
                <div className="hero-content flex">
                    <form
                        onSubmit={handleSubmit}
                        className="card flex-shrink-0  lg:max-w-lg shadow-2xl bg-base-100"
                    >
                        <div className="card-body rounded-2xl">
                            <h1 className="mt-6 text-5xl font-bold text-center mx-auto">
                                Sign Up
                            </h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    className="input input-bordered text-primary border-primary  w-full bg-primary/5 focus:bg-primary/30 focus:outline-0"
                                    name="name"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="photoURL"
                                    className="input input-bordered text-primary border-primary  w-full bg-primary/5 focus:bg-primary/30 focus:outline-0"
                                    name="photoURL"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered text-primary border-primary  w-full bg-primary/5 focus:bg-primary/30 focus:outline-0"
                                    name="email"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered text-primary border-primary  w-full bg-primary/5 focus:bg-primary/30 focus:outline-0"
                                    name="pass"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text text-xl font-semibold">
                                        Buyer
                                    </span>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="buyer"
                                        className="radio checked:bg-primary "
                                        checked
                                    />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text text-xl font-semibold">
                                        Seller
                                    </span>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="seller"
                                        className="radio checked:bg-primary"
                                    />
                                </label>
                            </div>
                            <div>
                                <p className="text-error">{error}</p>
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    className="btn btn-primary text-white"
                                    type="submit"
                                    value="Sign Up"
                                />
                            </div>
                            <label className="label">
                                <p>
                                    Already have an account?{" "}
                                    <Link
                                        to="/sign_in"
                                        className=" link link-hover decoration-primary"
                                    >
                                        <span className=" text-primary font-extrabold">
                                            Sign In
                                        </span>
                                    </Link>{" "}
                                    here
                                </p>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
