import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { tailspin } from 'ldrs'
import toast from 'react-hot-toast';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

tailspin.register()

const ProductEditCard = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { id } = useParams();


    const { data, isLoading, error } = useSWR(
        import.meta.env.VITE_API_URL + `/products/${id}`, fetcher

    );


    const [isSending, setIsSending] = useState(false);

    const navigate = useNavigate();

    const handleUpdateProduct = async (data) => {
        setIsSending(true);
        data.created_at = new Date().toISOString();
        await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_name: data.product_name, price: data.price, created_at: new Date().toISOString() })

        })

        setIsSending(false);
        if (back_to_product_list) {
            navigate('/product')
        }
        toast.success('Product updated successfully')
    }

    if(isLoading) return <p>Loading....</p>

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full md:w-1/2 mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Edit Product</h1>
            <p className="mb-6 text-gray-600 text-sm">
                Please fill in the details below to create a new product. Ensure all information is correct.
            </p>
            
            {
                isLoading ? (<div className="animate-pulse">
                    <div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-400 bg-gray-200 h-4 w-1/3 rounded"></label>
                            <input
                                type="text"
                                className="bg-gray-200 border border-gray-300 text-gray-400 text-sm rounded-lg block w-full h-10 p-2 placeholder-gray-400"
                               
                                disabled
                            />
                        </div>
                
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-400 bg-gray-200 h-4 w-1/3 rounded"></label>
                            <input
                                type="number"
                                className="bg-gray-200 border border-gray-300 text-gray-400 text-sm rounded-lg block w-full h-10 p-2 placeholder-gray-400"
                               
                                disabled
                            />
                        </div>
                
                        <div className="flex items-center mb-6">
                            <div className="bg-gray-200 h-5 w-5 rounded border border-gray-300"></div>
                            <label className="ml-2 text-sm font-medium text-gray-400 bg-gray-200 h-4 w-1/2 rounded"></label>
                        </div>
                
                        <div className="flex items-center mb-6">
                            <div className="bg-gray-200 h-5 w-5 rounded border border-gray-300"></div>
                            <label className="ml-2 text-sm font-medium text-gray-400 bg-gray-200 h-4 w-1/2 rounded"></label>
                        </div>
                
                        <div className="flex justify-between">
                            <div className="py-2 px-4 text-sm font-medium text-gray-400 bg-gray-200 h-10 w-1/3 rounded"></div>
                            <button
                                type="button"
                                className="flex gap-3 text-white bg-gray-400 h-10 w-1/3 rounded-lg"
                                disabled
                            >
                            </button>
                        </div>
                    </div>
                </div>
                ) : (
                    <form onSubmit={handleSubmit(handleUpdateProduct)}>
                <div className="mb-6">
                    <label
                        htmlFor="product_name"
                        className={`block mb-2 text-sm font-medium ${errors.product_name ? 'text-red-600' : 'text-gray-900'}`}
                    >
                        Product Name
                    </label>
                    <input
                        type="text"
                        {...register('product_name', { required: true, minLength: 3, maxLength: 30 })}
                        defaultValue={data?.data?.product_name}
                        id="product_name"
                        className={`bg-gray-100 border ${errors.product_name ? 'border-red-500' : 'border-gray-300'} 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                            transition duration-200 ease-in-out`}
                        placeholder="e.g., Apple"
                    />
                    {errors.product_name && (
                        <p className='mt-2 text-red-500 text-sm'>
                            {errors.product_name.type === "required" && "Product name is required"}
                            {errors.product_name.type === "minLength" && "Product name must be greater than 3 characters"}
                            {errors.product_name.type === "maxLength" && "Product name must be less than 30 characters"}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="price" className={`block mb-2 text-sm font-medium ${errors.price ? 'text-red-600' : 'text-gray-900'}`}>Price</label>
                    <input
                        type="number"
                        {...register('price', { required: true, min: 1000, max: 50000 })}
                        defaultValue={data?.data?.price}
                        id="price"
                        className={`bg-gray-100 border ${errors.price ? 'border-red-500' : 'border-gray-300'} 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                            transition duration-200 ease-in-out`}
                        placeholder="e.g., 1000"
                    />
                    {errors.price && (
                        <p className='mt-2 text-red-500 text-sm'>
                            {errors.price.type === "required" && "Price is required"}
                            {errors.price.type === "min" && "Price must be greater than 1000"}
                            {errors.price.type === "max" && "Price must be less than 5000"}
                        </p>
                    )}
                </div>

                <div className="flex items-center mb-6">
                    <input
                        id="remember"
                        {...register('remember', { required: true })}
                        type="checkbox"
                        className="w-5 h-5 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-blue-300"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-600">
                        Make sure all fields are correct
                    </label>
                </div>
                <div className="flex items-center mb-6">
                    <input
                        id="back_to_product_list"
                        {...register('back_to_product_list')}
                        type="checkbox"
                        checked
                        className="w-5 h-5 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-blue-300"
                    />
                    <label htmlFor="back_to_product_list" className="ml-2 text-sm font-medium text-gray-600">
                        Back to Product List after saving
                    </label>
                </div>

                <div className="flex justify-between">
                    <Link to={"/product"} className="py-2 px-4 text-sm font-medium text-blue-600 bg-transparent border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex gap-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 transition duration-200 ease-in-out"
                    >
                        Update Product
                        {isSending && <l-tailspin
                            size="20"
                            stroke="5"
                            speed="0.9"
                            color="white"
                        ></l-tailspin>}

                    </button>
                </div>
            </form>
                )
            }
        </div>
    );
};

export default ProductEditCard;
