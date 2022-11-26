import { useEffect, useState } from "react";
const useSellerVerified = () => {
   
    const [isSellerVerified, setIsSellerVerified] = useState(false);
    const [isSellerLoadingVerified, setIsSellerLoadingVerified] = useState(true);

    useEffect(() => {
        // if (email) {
            fetch(`http://localhost:5000/sellersVerified`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                   
                    setIsSellerVerified(data.isSellerVerified)
                    setIsSellerLoadingVerified(false)
                });
        // }
    }, []);
    return [isSellerVerified,isSellerLoadingVerified]
};
export default useSellerVerified;