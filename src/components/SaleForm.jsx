import React from 'react'
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import useRecordStore from '../stores/UseRecordStore';

const fetcher = (url) => fetch(url).then((res) => res.json());

const SaleForm = () => {

    const { data, error, isLoading } = useSWR(import.meta.env.VITE_API_URL + '/products?limits=100', fetcher);

    const { register, handleSubmit, reset } = useForm();

    const { addRecord, changeQuantity, records } = useRecordStore();

    const onSubmit = (data) => {
        const currentProduct =  JSON.parse(data.product);
        const currentProductId = currentProduct.id;

        const isExisted = records.find(({ product: {id} }) => currentProductId === id);

        if(isExisted) {

            changeQuantity( isExisted.id, data.quantity);

        } 
        else {
            addRecord({
                product: currentProduct,
                product_id: currentProduct.id,
                quantity: data.quantity,
                cost: data.quantity * currentProduct.price,
                created_at: new Date().toISOString()
            });
        }

        reset();
    }


    return (
        <div className='bg-white p-5 rounded-lg border mb-5' >
            <form action="#" id="recordForm " onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    <div className="col-span-2">
                        <label htmlFor="productSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Your Product</label>
                        <select id="productSelect"
                            {...register("product", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                <option value="">Select a product</option>
                            {
                                !isLoading &&  (
                                    data?.data?.map((product) => (
                                    <option key={product.id} value={JSON.stringify(product)}>{product.product_name}</option>
                                ))
                            )
                            }
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="quantityInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input type="number"
                            {...register("quantity", { required: true })}
                            id="quantityInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="col-span-1">
                        <button type='submit' className='border w-full h-full transition-all ease-in duration-75 border-blue-700 hover:bg-blue-700 hover:text-white text-blue-700 py-2 px-4 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default SaleForm