import Container from '../components/Container';
import useCookie from 'react-use-cookie';
import Breadcrumb from '../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useUserStore from '../stores/useUserStore';

const UserProfileChangeNamePage = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const { name, email, profile_image } = JSON.parse(userCookie);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [token] = useCookie("my_token");

  const { user, setUser } = useUserStore();

  const handleUpdateName = async (data) => {
    console.log(data);
    const res = await fetch(import.meta.env.VITE_API_URL + '/user-profile/change-name', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const json = await res.json();

    if(res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify( json.user ));
      setUser(json.user);
      reset();
    } else {
      toast.error(json.message);
    }
  }

  return (
    <section className="bg-gray-50 py-10">
      <Container>
        <Breadcrumb links={[{ title: "User Profile", path: "/dashboard/user-profile" }]} currentPageTitle="Change Name" />
        <form onSubmit={ handleSubmit(handleUpdateName) } className='bg-white p-8 rounded-lg shadow-lg flex items-center gap-6'>
          <div className="mb-6">
            <label
              htmlFor="name"
              className={`block mb-2 text-sm font-medium ${errors.name ? 'text-red-600' : 'text-gray-900'}`}
            >
              Update Your Name
            </label>
            <input
              type="text"
              {...register('name', { required: true, minLength: 3, maxLength: 30 })}
              id="name"
              className={`bg-gray-100 w-[300px] border ${errors.name ? 'border-red-500' : 'border-gray-300'} 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                            transition duration-200 ease-in-out`}
              placeholder="e.g., Mg Mg"
            />
            {errors.name && (
              <p className='mt-2 text-red-500 text-sm'>
                {errors.name.type === "required" && "Product name is required"}
                {errors.name.type === "minLength" && "Product name must be greater than 3 characters"}
                {errors.name.type === "maxLength" && "Product name must be less than 30 characters"}
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
      </Container>
    </section>
  );
}

export default UserProfileChangeNamePage