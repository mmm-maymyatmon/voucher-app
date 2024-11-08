import React from 'react'

const ProductListEmptyState = () => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td colSpan={5} className="px-6 py-4 text-center">
                There is no Product.
            </td>
        </tr>
    )
}

export default ProductListEmptyState