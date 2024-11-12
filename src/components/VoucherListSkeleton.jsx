import React from 'react'

const VoucherListSkeleton = () => {
  return (
    <>
    {[...Array(5)].map((_, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-40"></div>
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
            </td>
            <td className="px-6 py-4 text-end">
                <div className="h-4 bg-gray-200 rounded w-36"></div>
            </td>
            <td className="px-6 py-4 text-end">
                <div>
                    <p className="h-4 bg-gray-200 rounded w-20"></p>
                    <p className="h-4 bg-gray-200 rounded w-20"></p>
                </div>
            </td>
            <td className="px-6 py-4 text-end">
                <div className="flex items-center justify-end space-x-2">
                    <button className="h-8 w-8 bg-gray-200 rounded-md"></button>
                    <button className="h-8 w-8 bg-gray-200 rounded-md"></button>
                </div>
            </td>
        </tr>
        ))}
    </>
  )
}

export default VoucherListSkeleton