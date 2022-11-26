import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const MyOrders = () => {

    const {user} = useContext(AuthContext)


    // const uri = `http://localhost:5000/orders?email=${user?.email}`

    const {data:orders = [] } = useQuery({
        queryKey: ['orders',user?.email],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/orders?email=${user?.email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data;
        },
      })

      console.log(orders)


    return (
        <div>
            <h1 className='text-3xl'>My Orders</h1>

            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <td></td>
        <th>Product</th>
        <th>Price</th>
        <th>Payment</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* <!-- row 1 --> */}
      {
        orders.map((order,i) => <tr key={order._id}>
            {console.log(order)}
             
             <td>{i+1}</td>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={order.picture} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{order.model}</div>
                  
                </div>
              </div>
            </td>
            <td>
              
              <span className="badge badge-ghost font-bold">{order.resalePrice}</span>
            </td>
            
            <td>
              <Link to='/dashboard/payment' className="btn btn-ghost bg-red-300 btn-xs">Pay</Link>
            </td>
          </tr>)
      }
      
    </tbody>
    
    
  </table>
</div>
        </div>
    );
};

export default MyOrders;