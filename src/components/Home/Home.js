// import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvider/AuthProvider";
// import OrderModal from "../BookNowModal/BookNowModal";

const Home = () => {
    //  const {user} = useContext(AuthContext)

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/brands`)
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, []);

    // console.log(categories);

    const handleBrandProducts = (name) => {
        console.log(name);
    };

    return (
        <div>
            <div className="flex md:flex-row flex-col md:w-1/4 mx-auto">
                {categories.map((brand) => (
                    <Link
                        // category={brand.category_name}
                        to={`/productsByBrand/${brand.category_name}`}
                        // onClick={() => handleBrandProducts(brand.category_name)}
                        key={brand._id}
                        className="btn btn-primary mr-4"
                    >
                        {brand.category_name}
                    </Link>
                ))}
                <Link to="/all-products" className="btn btn-primary">
                    All products
                </Link>
            </div>

            <div className="hero mt-20">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">
                            Welcome <br /> to <br /> SellPhone
                        </h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <Link to="/all-products" className="btn btn-primary">
                            Visit Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
