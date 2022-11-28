import { Link } from "react-router-dom";

import React, { useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";
import { AuthContext } from "./../../../context/AuthProvider/AuthProvider";
import useToken from "../../../hook/useToken";

const SignIn = () => {
    useTitle("Login");
    const [error, setError] = useState("");
    const [loginUserEmail, setLoginUserEmail] = useState("");
    const [token] = useToken(loginUserEmail);
    const { signIn, providerLogin, loading, setLoading } =
        useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    if (token) {
        navigate(from, { replace: true });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.pass.value;
        // console.log(email,password);

        signIn(email, password)
            .then((result) => {
                // const user = result.user;
                setLoginUserEmail(email);

                setError("");
                toast.success("Loging Succesful", {
                    style: {
                        border: "1px solid #713200",
                        padding: "16px",
                        color: "#713200",
                    },
                    iconTheme: {
                        primary: "#713200",
                        secondary: "#FFFAEE",
                    },
                });
            })
            .catch((e) => {
                setLoading(false);
                setError(e.message);
            });
    };

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then((result) => {
                const email2 = result.user.email;
                const name = result.user.name;

                const user2 = {
                    name,
                    email: email2,
                    role: "buyer",
                };

                fetch(" https://sellphone-server-mehedi2283.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(user2),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.acknowledged) {
                            // form.reset();
                            // logOut();
                            // toast.success("Registration Complete");

                            // getUserToken(email)
                            setLoginUserEmail(email);
                            toast.success("Login Successful");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });

                const email = result.user.email;
                setLoginUserEmail(email);

                setError("");
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message);
            });
    };

    if (loading) {
        return (
            <div className="border my-72 border-primary/90 shadow rounded-md p-4 max-w-sm w-full mx-auto  ">
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
        <div className="   mx-auto mb-4   ">
            <div className="hero">
                <div className="hero-content flex ">
                    <form
                        onSubmit={handleSubmit}
                        className="card flex-shrink-0  lg:max-w-sm shadow-2xl bg-base-100"
                    >
                        <div className="card-body rounded-2xl">
                            <h1 className="text-center mx-auto mt-4 text-5xl font-bold">
                                Login now
                            </h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="input input-bordered focus:bg-primary/30 text-primary border-primary  w-full bg-primary/5 focus:outline-0"
                                    name="email"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ">
                                        Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered text-primary focus:bg-primary/30 border-primary  w-full bg-primary/5 focus:outline-0"
                                    name="pass"
                                />
                                <p className=" text-red-700">{error}</p>
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Login"
                                />
                                <h1 className="text-2xl font-bold text-center divider divider-vertical">
                                    or
                                </h1>
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="mb-4  border-0 btn flex gap-4 bg-blue-600 normal-case font-bold text-lg"
                                    variant="outline-primary"
                                >
                                    <FaGoogle></FaGoogle> SignIn with Google
                                </button>
                            </div>
                            <label className="label">
                                <p>
                                    Don't have account?{" "}
                                    <Link
                                        to="/sign_up"
                                        className=" link link-hover decoration-primary"
                                    >
                                        <span className=" font-extrabold text-primary">
                                            Sign Up
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

export default SignIn;
