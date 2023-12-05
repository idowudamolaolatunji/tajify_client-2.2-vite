import React, { useEffect } from "react";
import BioInfoCreator from "./creatorComponents/BioInfoCreator";
import ProfileHeroCreator from "./creatorComponents/ProfileHeroCreator";
import FollowAndPersonals from '../profile/profileComponents/FollowAndPersonals'
import Navbar from "../../components/Navbar";
import MainHeaderW from "../../components/MainHeaderW";


const CreatorsProfile = () => {
  useEffect(() => {
    // This code will run after the component has rendered
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <div>
      <MainHeaderW />
      <ProfileHeroCreator />
      <BioInfoCreator />
      <FollowAndPersonals />
    </div>
  );
};

export default CreatorsProfile;
