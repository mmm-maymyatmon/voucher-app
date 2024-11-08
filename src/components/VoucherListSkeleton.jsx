import React from 'react'

const VoucherListSkeleton = () => {
  return (
    <>
    {[...Array(5)].map((_, index) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
            <td class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded w-40"></div>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div class="h-4 bg-gray-200 rounded w-24"></div>
            </td>
            <td class="px-6 py-4 text-end">
                <div class="h-4 bg-gray-200 rounded w-36"></div>
            </td>
            <td class="px-6 py-4 text-end">
                <div>
                    <p class="h-4 bg-gray-200 rounded w-20"></p>
                    <p class="h-4 bg-gray-200 rounded w-20"></p>
                </div>
            </td>
            <td class="px-6 py-4 text-end">
                <div class="flex items-center justify-end space-x-2">
                    <button class="h-8 w-8 bg-gray-200 rounded-md"></button>
                    <button class="h-8 w-8 bg-gray-200 rounded-md"></button>
                </div>
            </td>
        </tr>
        ))}
    </>
  )
}

export default VoucherListSkeleton