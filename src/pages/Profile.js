import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center w-full gap-5 py-10 ">
      <h2 className='text-2xl font-semibold'>Homeworktips User Profile</h2>
      <div className='flex flex-col gap-5'>
        <div>
        <img src={`http://localhost:1000/uploads/${userInfo?.user?.profilePicture}`} alt="Profile"
        className='h-[20vh] rounded-full border-2 border-[#51B73B}' />
        </div>
        <p>Username: {userInfo?.user?.username}</p>
        <p>Email: {userInfo?.user?.email}</p>
      </div>
      <div>
        <Link className='py-[5px] px-[25px] bg-[#51B73B] border-2 rounded-sm cursor-pointer text-white' to={'/update-profile'}>Edit Profile</Link>
      </div>
    </div>
  );
}