import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import ProductCardForSeller from './../../ProductCard/ProductCardForSeller';

const MyProducts = () => {
    const {user} = useContext(AuthContext)

    const {data:myProducts = [] } = useQuery({
        queryKey: ['orders',user?.email],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/myProducts?email=${user?.email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data;
        },
      })
    return (
        <div>
          <p>my products {myProducts.length}</p>

            {
                myProducts.map(product => <ProductCardForSeller key={product._id} product={product}></ProductCardForSeller>)
            }
        </div>
    );
};

export default MyProducts;