import { useEffect, useState } from "react";
const useSellerVerified = (email) => {
    const [sellerVerified, setSellerVerified] = useState(false);
    const [isSellerLoadingVerified, setIsSellerLoadingVerified] =
        useState(true);

    useEffect(() => {
        // if (email) {
        fetch(
            `https://sellphone-server-mehedi2283.vercel.app/sellersVerified/${email}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                setSellerVerified(data.isSellerVerified);
                setIsSellerLoadingVerified(false);
            });
        // }
    }, []);
    return [sellerVerified, isSellerLoadingVerified];
};
export default useSellerVerified;
