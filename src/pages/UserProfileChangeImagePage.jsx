import Container from '../components/Container';
import useCookie from 'react-use-cookie';
import Breadcrumb from '../components/Breadcrumb';
import { HiPencilAlt } from "react-icons/hi";
import { HiKey } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useUserStore from '../stores/useUserStore';
import { HiCamera } from 'react-icons/hi2';
import { useRef } from 'react';

const UserProfileChangeImagePage = () => {

  const [userCookie, setUserCookie] = useCookie("user");
  const { name, email, profile_image } = JSON.parse(userCookie);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [token] = useCookie("my_token");

  const { user, setUser } = useUserStore();

  const fileInputRef = useRef();

  const handleUpdateImage = async (event) => {
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('profile_image', event.target.files[0]);

    const res = await fetch(import.meta.env.VITE_API_URL + '/user-profile/change-profile-image',
      {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

    const json = await res.json();

    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
    } else {
      toast.error(json.message);
    }

  }

  const handleImageUploader = (e) => {
    fileInputRef.current.click();
  }



  return (
    <section className="bg-gray-50 py-10">
      <Container>
        <Breadcrumb links={[{ title: "User Profile", path: "/dashboard/user-profile" }]} currentPageTitle="Change Photo" />
        <div className='bg-white rounded-lg shadow-lg flex flex-col w-full p-10'>
          <div className='relative size-32' >
            <img
              className="border-2 border-indigo-5border-4 border-indigo-200 w-full h-full rounded-full size-32  object-contain"
              src={profile_image || "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"}
              alt="profile"
            />
            <button onClick={handleImageUploader} className='absolute bottom-0 right-0 inline-block  bg-indigo-600 p-2 text-white shadow-lg hover:bg-indigo-700 transition-transform duration-200 transform hover:scale-105'>
              <HiCamera />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleUpdateImage)}>

            <div className="mb-6">
              <input ref={fileInputRef} onChange={handleUpdateImage}
                className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
              </input>
              {errors.profile_image && (
                <p className='mt-2 text-red-500 text-sm'>
                  {errors.profile_image.type === "required" && "Profile image is required"}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Update
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default UserProfileChangeImagePage