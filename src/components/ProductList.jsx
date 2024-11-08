import React from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import useSWR from 'swr';
import ProductListSkeleton from './ProductListSkeleton';
import ProductListEmptyState from './ProductListEmptyState';
import ProductRow from './ProductRow';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { debounce } from 'lodash';
import Pagination from './Pagination';
import useCookie from 'react-use-cookie';

const ProductList = () => {

    const [token] = useCookie("my_token");

    const [fetchUrl, setFetchUrl] = useState(
        import.meta.env.VITE_API_URL + '/products'
    );

    const fetcher = (url) => fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json());

    const { data, isLoading, error } = useSWR(
        fetchUrl,
        fetcher
    );

    const handleSearchInput = debounce((e) => {
        setFetchUrl(`${import.meta.env.VITE_API_URL}/products?q=${e.target.value}`);

    }, 500);

    const updateFetchUrl = (url) => {
        setFetchUrl(url);
    }

    // console.log(data)
    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-between p-3">
                <form className='w-1/5'>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={handleSearchInput} type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                    </div>
                </form>
                <Link to={"/product/create"} className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center">Add New Product <HiMiniPlus className='ml-2' /></Link>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Created at
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Updated at
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    isLoading ? (
                        <ProductListSkeleton />
                    ) : data?.data?.length === 0 ? (
                        <ProductListEmptyState />
                    ) : (
                        data?.data?.map((product)=> <ProductRow key={product.id} product={product} />)
                    )
                }

                
                </tbody>
            </table>
            {
                !isLoading &&
                <Pagination meta={data?.meta} links={data?.links} updateFetchUrl={updateFetchUrl} />
            }
            
        </div>


    )
}

export default ProductList