import React, { useEffect } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileHero from './profileComponents/ProfileHero';
import BioInfo from './profileComponents/BioInfo';
import './profile.css';
import FollowAndPersonals from './profileComponents/FollowAndPersonals';
import SubHeader from '../../components/SubHeader';
import Navbar from "../../components/Navbar";
import MainHeaderW from "../../components/MainHeaderW";



function UserProfile() {

  useEffect(() => {
    // This code will run after the component has rendered
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <>
      {/* <ProfileHeader /> */}
      {/* <Navbar /> */}
      <MainHeaderW />
      <ProfileHero />
      <BioInfo />
      <FollowAndPersonals />
    </>
  )
}

export default UserProfile
