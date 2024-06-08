import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProfile() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [username, setUsername] = useState(userInfo?.user?.username || '');
  const [email, setEmail] = useState(userInfo?.user?.email || '');
  const [profilePicture, setProfilePicture] = useState('');
  const [availability, setAvailability] = useState(userInfo?.user?.availability || '');
  const [profileDescription, setprofileDescription] = useState(userInfo?.user?.skillset || '');
  const [walletAddress, setWalletAddress] = useState(userInfo?.user?.walletAddress || '');

  const handleSubmit = async (e) => {
      const data = new FormData();
      data.set('username', username);
      data.set('email', email);
      data.set('availability', availability);
      data.set('profileDescription', profileDescription);
      data.set('walletAddress', walletAddress);
      data.set('image', profilePicture[0]);

    e.preventDefault();

    try {
      const response = await fetch('https://homeworktips-22mg.onrender.com/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: data
      });

      const responseData = await response.json();
      if (response.ok) {
        setUserInfo(responseData.user);
        toast.success(responseData.message);
      } else {
        toast.error(responseData.error);
      }
    } catch (error) {
      toast.error('Error updating profile: ' + error.message);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className='flex flex-col w-full justify-center items-center gap-5'>
      <h2 className="text-[23px]">Update Profile</h2>
        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required 
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            />
        </div>
        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            />
        </div>
        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Profile Picture</label>
          <input type="file" onChange={ev => setProfilePicture(ev.target.files)} 
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white py-2"
            />
        </div>
        <div className="flex flex-col w-[80%] gap-3">
            <label className="font-semibold text-[20px]">Availability</label>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)} 
                className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            </div>

        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">profileDescription</label>
          <input type="text" value={profileDescription} onChange={(e) => setprofileDescription(e.target.value)} 
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
          />
        </div>
        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Wallet Address</label>
          <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} 
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
          />
        </div>
        <button type="submit" className="bg-[#51B73B] py-[8px] px-[35px] rounded-xl text-lime-50 text-[18px]">Update Profile</button>
      </form>
      <ToastContainer />
    </div>
  );
}
