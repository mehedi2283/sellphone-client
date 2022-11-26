import React from 'react';
import { ChevronDoubleUpIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';


const Error404 = () => {

    useTitle('404')
    return (
        <div className='text-6xl text-center mt-52 text-orange-800 font-black'>
    <h1>No Route Found!</h1>

    <ExclamationTriangleIcon className='h-32 w-32 text-center mx-auto animate-bounce mt-6'></ExclamationTriangleIcon>
    <Link className=' btn btn-lg  btn-outline border-4 hover:border-orange-800 text-orange-800 border-red-800 hover:bg-orange-800' to='/'>

                
                    
                    
                        <p className=' font-bold '>Go Back</p>
                        <ChevronDoubleUpIcon className='h-6 w-6 '></ChevronDoubleUpIcon>
                   
            </Link>

  </div>
    );
};

export default Error404;