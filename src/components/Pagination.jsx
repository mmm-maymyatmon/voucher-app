import React from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2'

const Pagination = ({links: {next, prev}, meta: { total, to, from, current_page }, updateFetchUrl}) => {
    const handlePrevBtn = async() => {
        updateFetchUrl(prev);
    }
    const handleNextBtn = async() => {
        updateFetchUrl(next);
    }
    return (
        <div className='my-5'>
            <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{from}</span> to  <span className="font-semibold text-gray-900 dark:text-white">{to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span> Entries 
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button onClick={handlePrevBtn} disabled={!prev} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-l-lg transition-all  ease-in-out  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white disabled:opacity-50 ">
                        <HiArrowLeft  />
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 transition-all  ease-in-out  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white">
                        { current_page}
                    </button>
                    <button onClick={handleNextBtn} disabled={!next} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-r-lg transition-all  ease-in-out  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white disabled:opacity-50">
                        <HiArrowRight/>
                    </button>
                </div> 
            </div>

        </div>

    )
}

export default Pagination