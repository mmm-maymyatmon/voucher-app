import Container from '../components/Container';
import React, { useState } from 'react';
import useCookie from 'react-use-cookie';
import Breadcrumb from '../components/Breadcrumb';
import { HiPencilAlt } from "react-icons/hi";
import { HiKey } from "react-icons/hi"; // Importing key icon for password

const UserProfilePage = () => {
    const [user] = useCookie("user");
    const { name, email, profile_image } = JSON.parse(user);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    const handleChangePassword = () => {
        setIsChangePasswordModalOpen(true);
    };

    const closeModal = () => {
        setIsChangePasswordModalOpen(false);
    };

    return (
        <section className="bg-gray-50 py-10">
            <Container>
                <Breadcrumb currentPageTitle="User Profile" />
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-6">

                    <div className="relative w-40 h-40">
                        <img 
                            className="border-4 border-indigo-200 w-full h-full rounded-full object-cover" 
                            src={profile_image || "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"} 
                            alt="profile" 
                        />
                        <button 
                            className="absolute bottom-2 right-2 bg-indigo-600 p-2 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-200 transform hover:scale-105"
                            onClick={() => alert("Edit Profile Image")}
                        >
                            <HiPencilAlt className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
                        <button 
                            className="p-1 bg-gray-100 text-indigo-600 rounded-full hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105"
                            onClick={() => alert("Edit Name")}
                        >
                            <HiPencilAlt className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            className="flex items-center gap-2 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                            onClick={handleChangePassword}
                        >
                            <HiKey className="w-5 h-5" />
                            <span>Change Password</span>
                        </button>
                    </div>

                    {isChangePasswordModalOpen && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                                <div className="flex flex-col gap-4">
                                    <input 
                                        type="password" 
                                        placeholder="Current Password" 
                                        className="border border-gray-300 rounded-lg p-2"
                                    />
                                    <input 
                                        type="password" 
                                        placeholder="New Password" 
                                        className="border border-gray-300 rounded-lg p-2"
                                    />
                                    <input 
                                        type="password" 
                                        placeholder="Confirm New Password" 
                                        className="border border-gray-300 rounded-lg p-2"
                                    />
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button 
                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                        onClick={() => alert("Password Changed")}
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default UserProfilePage;
