import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { tailspin } from 'ldrs';
import toast from 'react-hot-toast';
import SaleForm from './SaleForm';
import VoucherTable from './VoucherTable';
import useRecordStore from '../stores/UseRecordStore';
import { useNavigate } from 'react-router-dom';

tailspin.register();

const VoucherInfo = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSending, setIsSending] = useState(false);
    const { records, resetRecord } = useRecordStore();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsSending(true);
        const total = records.reduce((acc, record) => acc + record.cost, 0);
        const tax = total * 0.07;
        const net_total = total + tax;
        const currentVoucher = { ...data, records, total, tax, net_total };

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/vouchers?limits=100', {
                method: 'POST',
                body: JSON.stringify(currentVoucher),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            const json = await res.json();
            console.log("Invalid ID",json);
            
            if (res.status === 201) {
                toast.success("Voucher created successfully");
                resetRecord();
                reset();
                setIsSending(false);
                if (data.redirect_to_detail) {
                    navigate(`/voucher/detail/${json.voucher.id}`);
                }
            } else {
                toast.error(json.message);
            }
        } catch (error) {
            console.error("Error creating voucher:", error);
            toast.error("Failed to create voucher. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    function generateInvoiceNumber() {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');
        const randomNumber = Math.floor(Math.random() * 1000000);
        const invoiceNumber = `INV${formattedDate}${randomNumber}`;
        return invoiceNumber;
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
            <div className='col-span-3'>
                <SaleForm />

                <VoucherTable />
            </div>
            <div className='col-span-1'>
                <form onSubmit={handleSubmit(onSubmit)} id='infoForm'>
                    <div className='grid grid-cols-1 gap-2'>
                        <div className='col-span-1'>
                            <div>
                                <label
                                    htmlFor="voucher_id"
                                    className={`block mb-2 text-sm font-medium ${errors.voucher_id ? 'text-red-600' : 'text-gray-900'}`}
                                >
                                    Voucher Id
                                </label>
                                <input
                                    type="text"
                                    defaultValue={generateInvoiceNumber()}
                                    {...register('voucher_id', { required: true })}
                                    id="voucher_id"
                                    className={`bg-gray-100 border ${errors.voucher_id ? 'border-red-500' : 'border-gray-300'} 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                            transition duration-200 ease-in-out`}
                                />
                                {errors.voucher_id && (
                                    <p className='mt-2 text-red-500 text-sm'>
                                        {errors.voucher_id.type === "required" && "Voucher id is required"}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div>
                                <label
                                    htmlFor="customer_name"
                                    className={`block mb-2 text-sm font-medium ${errors.customer_name ? 'text-red-600' : 'text-gray-900'}`}
                                >
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    {...register('customer_name', { required: true })}
                                    id="customer_name"
                                    className={`bg-gray-100 border ${errors.customer_name ? 'border-red-500' : 'border-gray-300'} 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                            transition duration-200 ease-in-out`}
                                />
                                {errors.customer_name && (
                                    <p className='mt-2 text-red-500 text-sm'>
                                        {errors.customer_name.type === "required" && "Customer name is required"}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div>
                                <label
                                    htmlFor="customer_email"
                                    className={`block mb-2 text-sm font-medium ${errors.customer_email ? 'text-red-600' : 'text-gray-900'}`}
                                >
                                    Customer Email
                                </label>
                                <input
                                    type="text"
                                    {...register('customer_email', { required: true })}
                                    id="customer_email"
                                    className={`bg-gray-100 border ${errors.customer_email ? 'border-red-500' : 'border-gray-300'} 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                            transition duration-200 ease-in-out`}
                                />
                                {errors.customer_email && (
                                    <p className='mt-2 text-red-500 text-sm'>
                                        {errors.customer_email.type === "required" && "Customer email is required"}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div>
                                <label
                                    htmlFor="sale_date"
                                    className={`block mb-2 text-sm font-medium ${errors.sale_date ? 'text-red-600' : 'text-gray-900'}`}
                                >
                                    Sale Date
                                </label>
                                <input
                                    type="date"
                                    defaultValue={new Date().toISOString().slice(0, 10)}
                                    {...register('sale_date', { required: true })}
                                    id="sale_date"
                                    className={`bg-gray-100 border ${errors.sale_date ? 'border-red-500' : 'border-gray-300'} 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                            transition duration-200 ease-in-out`}
                                />
                                {errors.sale_date && (
                                    <p className='mt-2 text-red-500 text-sm'>
                                        {errors.sale_date.type === "required" && "Sale date is required"}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div>
                            <div className="flex items-center mr-5">

                                
                                <input
                                    id="redirect_to_detail"
                                    {...register('redirect_to_detail')}
                                    form="infoForm"
                                    type="checkbox"
                                    className="w-5 h-5 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-blue-300"
                                />
                                <label htmlFor="redirect_to_detail" className="ml-2 text-sm font-medium text-gray-600">
                                    Redirect to Voucher Detail
                                </label>
                            </div>
                            <div className="flex items-center mr-5">

                                
                                <input
                                    id="remember"
                                    {...register('remember', { required: true })}
                                    form="infoForm"
                                    type="checkbox"
                                    className="w-5 h-5 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-blue-300"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-600">
                                    Make sure all fields are correct
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            form='infoForm'
                            className="flex text-center margin-auto gap-3 mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 transition duration-200 ease-in-out"
                        >
                            Confirm Voucher
                            {isSending && <l-tailspin
                                size="20"
                                stroke="5"
                                speed="0.9"
                                color="white"
                            ></l-tailspin>}
                        </button>
                    </div>
                </form>
            </div>




        </div>

    )
}

export default VoucherInfo