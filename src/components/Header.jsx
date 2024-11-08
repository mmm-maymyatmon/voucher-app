
import React from 'react'
import Container from './Container'
import useCookie from 'react-use-cookie';

const Header = () => {
  const [userCookie] = useCookie("user");
  // console.log(userCookie)

  const { name, email , profile_image } = JSON.parse(userCookie);
  // console.log(userObj)
  return (
    <header className='w-full mb-5'>
      <Container>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold mb-5'>Voucher App</h1>

          <div className='flex items-center gap-3'>
            <img className='w-10 h-10 rounded-full' src={ profile_image ? profile_image : "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg" } alt="profile image" />
            <div>
            <h1 className='text-lg font-bold'>{ name } </h1>
            <p className='text-xs text-gray-500'>{ email }</p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header