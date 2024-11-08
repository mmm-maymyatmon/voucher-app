import React from 'react'

const ProductListSkeleton = () => {
    return (
        <>
        {[...Array(7)].map((_, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
            <td className="px-6 py-4">
                <div className="w-6 h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="w-40 h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
            </th>
            <td className="px-6 py-4 text-end">
                <div className="w-16 h-6 bg-gray-300 rounded dark:bg-gray-600 inline-block"></div>
            </td>
            <td className="px-6 py-4 text-end">
                <div className="mb-1 w-20 h-4 bg-gray-300 rounded dark:bg-gray-600 inline-block"></div><br />
                <div className="w-16 h-4 bg-gray-300 rounded dark:bg-gray-600 inline-block"></div>
            </td>
            <td className="px-6 py-4 text-end">
                <div className="inline-flex rounded-md shadow-lg" role="group">
                    <div className="w-[54px] h-10 bg-gray-300 rounded-l-lg dark:bg-gray-600 mr-1 inline-block"></div>
                    <div className="w-[54px] h-10 bg-gray-300 rounded-r-lg dark:bg-gray-600 inline-block"></div>
                </div>
            </td>
        </tr>
        ))}
        
        </>
        
    )
}

export default ProductListSkeleton