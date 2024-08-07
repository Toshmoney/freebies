import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import profilepic from "../assets/images/freebiestech.png"

export default function Profile() {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center w-full gap-5 py-10 ">
      {/* SEO Settings... Don't touch it oo */}
      <Helmet>
                <meta charSet="utf-8" />
                <title>My Profile</title>
                <meta name="description" content='User Profile details' />
                
      </Helmet>

      {/* End of SEO Settings... Don't touch it oo */}
      <h2 className='text-2xl font-semibold'>Homeworktips User Profile</h2>
      <div className='flex flex-col gap-5'>
        <div>
          <img src={userInfo?.user?.profilePicture ? `https://homeworktips-22mg.onrender.com/uploads/${userInfo?.user?.profilePicture}` : profilepic} alt="Profile"
            className='h-[20vh] rounded-full border-2 border-[#51B73B]' />
        </div>
        <p>My Profile Description <br/> {userInfo?.user?.profileDescription || "Update your profile to set profile description"}</p>
        <p>Username: {userInfo?.user?.username || "Guest"}</p>
        <p>Email: {userInfo?.user?.email || "guest@homeworktips.info"}</p>
        <p>Availability: {userInfo?.user?.availability ? 'I am available for work' : 'Not Available'}</p>
        <p>Wallet Address: {userInfo?.user?.walletAddress}</p>
      </div>
      <div>
        <Link className='py-[5px] px-[25px] bg-[#51B73B] border-2 rounded-sm cursor-pointer text-white' to={'/update-profile'}>Edit Profile</Link>
      </div>
    </div>
  );
}
