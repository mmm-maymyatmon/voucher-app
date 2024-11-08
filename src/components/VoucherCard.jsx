import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import html2pdf from 'html2pdf.js';
import printJS from 'print-js';

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherCard = () => {
    // const { id } = useParams();
    // const { data, isLoading, error } = useSWR(import.meta.env.VITE_API_URL + '/vouchers/' + id, fetcher);

    const { id } = useParams();
console.log("Fetching voucher with ID:", id);
const { data, isLoading, error } = useSWR(import.meta.env.VITE_API_URL + '/vouchers/' + id, fetcher);
console.log("Fetched data:", data);



    const handlePrint = () => {
        printJS({ printable: 'printArea', type: 'html', css: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' });
    };

    const handleExportPDF = () => {
        const element = document.getElementById('printArea');
        const options = {
            margin: 1,
            filename: `Voucher-${data.voucher_id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(options).from(element).save();
    };

    if (isLoading) return <p>Loading....</p>;

    return (
        <div className='flex gap-5'>
            <div id='printArea' className="w-[14.8cm] bg-white p-8 shadow-lg">
                <div className="flex justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600">INVOICE</h1>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-semibold text-blue-600">BRAND NAME</h2>
                        <p className="text-sm text-gray-600 mt-2">Payment Info</p>
                        <p className="text-sm text-gray-600">A/c Name: {data?.data?.customer_name}</p>
                        <p className="text-sm text-gray-600">Email: {data?.data?.customer_email}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <div>
                        <p className="text-sm text-gray-600">Invoice No: <br />{data?.data?.voucher_id}</p>
                        <p className="text-sm text-gray-600">Date: {data?.data?.sale_date}</p>
                    </div>
                </div>

                <table className="w-full mb-8">
                    <thead> 
                        <tr className="text-blue-600 bg-gray-100">
                            <th className="py-2 px-4 text-left">NO</th>
                            <th className="py-2 px-4 text-left">PRODUCT DESCRIPTION</th>
                            <th className="py-2 px-4 text-right">QTY</th>
                            <th className="py-2 px-4 text-right">PRICE</th>
                            <th className="py-2 px-4 text-right">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.records.map((record, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{record.product.product_name}</td>
                                    <td className="py-2 px-4 text-right">{record.quantity}</td>
                                    <td className="py-2 px-4 text-right">{record.product.price}</td>
                                    <td className="py-2 px-4 text-right">{record.product.price * record.quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="py-2 px-4 text-right">Total</td>
                            <td className="py-2 px-4 text-right">{parseInt(data?.data?.total).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="py-2 px-4 text-right">Tax (Vat 7%)</td>
                            <td className="py-2 px-4 text-right">{parseInt(data?.data?.tax).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="py-2 px-4 text-right">Net Total</td>
                            <td className="py-2 px-4 text-right">{parseInt(data?.data?.net_total).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600">mmm-maymyatmon.gmail@com</p>
                        <p className="text-sm text-gray-600">www.maymyatmon.com</p>
                        <p className="text-sm text-gray-600">+123 456789955</p>
                        <p className="text-sm text-gray-600">Bangkok, Thailand</p>
                    </div>
                    <div className="text-right">
                        <p className="mb-2">Signature</p>
                        <p className="text-sm text-blue-600 font-semibold">THANK YOU FOR YOUR BUSINESS</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col'>
                <button onClick={handlePrint} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Print
                </button>
                <button onClick={handleExportPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export to PDF
                </button>
            </div>
        </div>
    );
};

export default VoucherCard;
