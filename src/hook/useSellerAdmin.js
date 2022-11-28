import { useEffect, useState } from "react";
const useSellerVerified = () => {
    const [isSellerVerified, setIsSellerVerified] = useState(false);
    const [isSellerLoadingVerified, setIsSellerLoadingVerified] =
        useState(true);

    useEffect(() => {
        // if (email) {
        fetch(` https://sellphone-server-mehedi2283.vercel.app/sellersVerified`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                setIsSellerVerified(data.isSellerVerified);
                setIsSellerLoadingVerified(false);
            });
        // }
    }, []);
    return [isSellerVerified, isSellerLoadingVerified];
};
export default useSellerVerified;
