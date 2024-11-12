import React from 'react';
import useCookie from 'react-use-cookie';
import Breadcrumb from '../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Container from '../components/Container';
import { Link, useNavigate } from 'react-router-dom';

const UserProfileChangePasswordPage = () => {
  const [token] = useCookie("my_token");
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
  });
  const navigate = useNavigate();

  const handleUpdatePassword = async (data) => {
    if (!token) {
      toast.error("Session expired. Please log in again.");
      navigate("/");
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/user-profile/change-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await res.json();

      if (res.status === 200) {
        toast.success(json.message);
        reset();
        setTimeout(() => {
          navigate("/");  
        }, 3000);  
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section>
      <Container>
        <Breadcrumb links={[{ title: "User Profile", path: "/dashboard/user-profile" }]} currentPageTitle="Change Password" />
        <form onSubmit={handleSubmit(handleUpdatePassword)}>
          <div className="bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-50 min-h-screen flex justify-center items-center py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">Change Password</h2>
              <div className="flex flex-col gap-6">
                <input 
                  {...register("old_password", { required: "Current password is required" })}
                  type="password"
                  placeholder="Current Password"
                  autoComplete="old-password"
                  className={`bg-gray-100 w-[300px] border ${errors.old_password ? 'border-red-500' : 'border-gray-300'} 
                              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                              transition duration-200 ease-in-out`}
                />
                {errors.old_password && <p className="text-red-500 text-sm">{errors.old_password.message}</p>}
                
                <input
                  {...register("new_password", { 
                    required: "New password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters long" }
                  })}
                  type="password"
                  placeholder="New Password"
                  autoComplete="new-password"
                  className={`bg-gray-100 w-[300px] border ${errors.new_password ? 'border-red-500' : 'border-gray-300'} 
                              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                              transition duration-200 ease-in-out`}
                />
                {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password.message}</p>}
                
                <input
                  {...register("new_password_confirmation", { 
                    required: "Please confirm your new password",
                    validate: value => value === watch("new_password") || "Passwords do not match"
                  })}
                  type="password"
                  placeholder="Confirm New Password"
                  autoComplete="new-password"
                  className={`bg-gray-100 w-[300px] border ${errors.new_password_confirmation ? 'border-red-500' : 'border-gray-300'} 
                              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                              transition duration-200 ease-in-out`}
                />
                {errors.new_password_confirmation && <p className="text-red-500 text-sm">{errors.new_password_confirmation.message}</p>}
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Link to="/dashboard/user-profile" className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out">
                  Cancel
                </Link>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default UserProfileChangePasswordPage;
