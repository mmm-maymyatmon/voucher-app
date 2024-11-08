import React, { useState } from 'react'
import { HiOutlinePencil, HiOutlineTrash, HiMiniInformationCircle } from 'react-icons/hi2'
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';
import ShowDate from './ShowDate';
import { bouncy } from 'ldrs';
import { Link } from 'react-router-dom';

bouncy.register()

const VoucherListRow = ({ voucher: { id, voucher_id, customer_name, customer_email, sale_date } }) => {

    const { mutate } = useSWRConfig();
    const [isDeleting, setIsDeleting] = useState(false);


    const handleDeleteBtn = async () => {
        setIsDeleting(true);
        if (window.confirm('Are you sure you want to delete this voucher?')) {
            await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
                method: 'DELETE',
            });
            toast.success('Voucher deleted successfully');
            mutate(import.meta.env.VITE_API_URL + `/vouchers`);
        }
    }

    return (
        <>
            < tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                    {voucher_id}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {customer_name}
                </th>
                <td className="px-6 py-4 text-end">
                    {customer_email}
                </td>
                <td className="px-6 py-4 text-end">
                    <ShowDate timestamp={sale_date} />
                </td>

                <td className="px-6 py-4  text-end">
                    <div className="inline-flex rounded-md shadow-lg" role="group">
                        
                        <button
                            onClick={handleDeleteBtn}
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-l-md transition-all  ease-in-out  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white"
                        >
                            {isDeleting ?

                                <l-bouncy
                                    size="20"
                                    speed="1.75"
                                    color="red"
                                ></l-bouncy> : <HiOutlineTrash className="w-5 h-5 text-red-500" />}

                        </button>
                        <Link type="button" to={`/voucher/detail/${id}`}
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-r-md transition-all  ease-in-out  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white">
                                <HiMiniInformationCircle className="w-5 h-5 text-blue-500" />
                            </Link>
                    </div>

                </td>
            </tr>
        </>
    )
}

export default VoucherListRow