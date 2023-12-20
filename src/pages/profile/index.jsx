import React, { useEffect, useState } from 'react';
// import ProfileHeader from '../../components/ProfileHeader';
import ProfileHero from './profileComponents/ProfileHero';
import BioInfo from './profileComponents/BioInfo';
import './profile.css';
import FollowAndPersonals from './profileComponents/FollowAndPersonals';
import SubHeader from '../../components/SubHeader';
import Navbar from "../../components/Navbar";
import MainHeaderW from "../../components/MainHeaderW";
import axios from '../../Api/axios';
import { HOST_URL } from '../../assets/js/help_func';
import { useAuthContext } from '../../context/AuthContext';


const GET_USER_OBJ_URL = `${HOST_URL()}/users/getMyObj`;


function UserProfile() {
  const { token, user, refetchHelp, handleUser } = useAuthContext();
  const [userImage, setUserImage] = useState();
  const [bioInfo, setBioInfo] = useState();
  // const [userImage, setUserImage] = useState();



   // This function generates all the updated information of the user
   const getCurrentUserUpdatedObj = async (id) => {
    try {
      const userObj = await axios.get(GET_USER_OBJ_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userObj.data.data.user) {
        console.log(userObj.data.data.user.image);
        setUserImage(userObj.data.data.user.image);
        setBioInfo(userObj.data.data.user);
      } else {
        console.error("Error fetching user object");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(userImage);
  console.log(bioInfo);

  

  // Render first upon every page reload
  useEffect(() => {
    getCurrentUserUpdatedObj();
  }, []);

  useEffect(() => {
    // This code will run after the component has rendered
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <>
      {/* <ProfileHeader /> */}
      {/* <Navbar /> */}
      <MainHeaderW userImage={userImage} />
      <ProfileHero userImage={userImage} bioInfo={bioInfo} />
      <BioInfo  />
      <FollowAndPersonals userImage={userImage} />
    </>
  )
}

export default UserProfile
