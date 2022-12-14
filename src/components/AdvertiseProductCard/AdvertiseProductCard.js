// import React from 'react';
// import OrderModal from './../BookNowModal/BookNowModal';

// const AdvertiseProductCard = ({product}) => {
//     const {
//         picture,
//         model_name: name,
//         location,
//         resale_price,
//         original_price,
//         years_of_use,
//         posted_time,
//         seller_name,
//         isVerified,
//         isBooked,
//     } = product.product;
    
//         return (
//             <div className="card card-compact w-96 bg-base-100 shadow-xl mb-6">
//                 <figure>
//                     <img src={picture} alt={name} />
//                 </figure>
//                 <div className="card-body">
//                     <h2 className="text-2xl font-bold  text-center">{name}</h2>
//                     <p className="text-center text-base font-medium">Location: {location}</p>
//                     <div className="flex ">
//                         <p className="text-center text-base font-medium w-1/2">
//                             Resale Price: {resale_price} tk
//                         </p>
//                         <p className="text-center text-base font-medium w-1/2">
//                             Original Price: {original_price} tk
//                         </p>
//                     </div>
//                     <div className="flex ">
//                         <p className="text-center text-base font-medium w-1/2">
//                             Years of use: {years_of_use} years
//                         </p>
//                         <p className="text-center text-base font-medium w-1/2">
//                             Post date: {posted_time}{" "}
//                         </p>
//                     </div>
//                     <div className="flex justify-center gap-2 items-center">
//                         <h2 className="text-center text-lg font-bold uppercase">
//                            <span className="normal-case"> Sellers Name</span>: {seller_name}{" "}
//                         </h2>
//                         {!isVerified ? (
//                             <GoUnverified className="text-xl"></GoUnverified>
//                         ) : (
//                             <GoVerified className="text-xl text-blue-500" ></GoVerified>
//                         )}
//                     </div>
//                     <div className=' card-actions'>
//                         <label
//                             onClick={() => handleProductDetails(product._id)}
//                             htmlFor="order-modal"
//                             className={`  ${isBuyer === false || isBooked ==='booked' ?'btn-disabled btn btn-primary w-full':'btn btn-primary w-full'} `}
//                         >
//                            {` ${isBuyer === false || isBooked ==='booked' ?'Not Available':' Book Now'}`}
//                         </label>
    
//                         <OrderModal
//                             productDetails={productDetails}
//                             // setCheckout={setCheckout}
//                             id={product._id}
//                             user={user}
//                             refetch={refetch}
//                         ></OrderModal>
//                     </div>
//                 </div>
//             </div>
//         );
   
// };

// export default AdvertiseProductCard;