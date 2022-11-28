import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider/AuthProvider";

const useToken = (email) => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const { logOut, setLoading } = useContext(AuthContext);
    useEffect(() => {
        if (email) {
            fetch(`sellphone-server-mehedi2283.vercel.app/jwt?email=${email}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.accessToken === " ") {
                        logOut();
                        navigate("/sign_in");
                        setLoading(false);
                    }

                    localStorage.setItem("accessToken", data.accessToken);
                    setToken(data.accessToken);
                    // navigate("/sign_in");
                });
        }
    }, [email, logOut, navigate, setLoading]);
    return [token];
};
export default useToken;
