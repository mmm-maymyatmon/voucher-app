import Container from '../components/Container';
import React, { useState } from 'react';
import useCookie from 'react-use-cookie';
import Breadcrumb from '../components/Breadcrumb';
import { HiPencilAlt } from "react-icons/hi";
import { HiKey } from "react-icons/hi"; 
import { Link } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';


const UserProfilePage = () => {
    // const [user] = useCookie("user");
    // const { name, email, profile_image } = JSON.parse(user);

    const { user: { name, email, profile_image } } = useUserStore();

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
                            className="border-4 border-indigo-200 w-full h-full rounded-full object-contain" 
                            src={profile_image || "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"} 
                            alt="profile" 
                        />
                        <Link 
                            to="user-change-image" 
                            className="absolute bottom-2 right-2 bg-indigo-600 p-2 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            <HiPencilAlt className="w-5 h-5" />
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
                        <Link to="user-change-name"
                            className="p-1 bg-gray-100 text-indigo-600 rounded-full hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105"
                        >
                            <HiPencilAlt className="w-4 h-4" />
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link 
                            to="user-change-password"    
                            className="flex items-center gap-2 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                            onClick={handleChangePassword}
                        >
                            <HiKey className="w-5 h-5" />
                            <span>Change Password</span>
                        </Link>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default UserProfilePage;
