import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { PiNotePencilFill, PiGearBold } from "react-icons/pi";
import { BiSolidMessageAltDots } from "react-icons/bi";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { FaUserAlt, FaBicycle } from "react-icons/fa";
import { LiaEnvelopeSolid } from "react-icons/lia";
import { FiPhone } from "react-icons/fi";
import { PiGlobeSimpleBold } from "react-icons/pi";

function BioInfoCreator() {
  const { token, user, refetchHelp } = useAuthContext();
  console.log(user);
  return (
    <section className="bio__section">
      <div className="section__container">
        <div className="bio--cards">
          <BioFigure user={user} />
          <BioContent user={user} />
        </div>
      </div>
    </section>
  );
}

function BioFigure({ user }) {
  return (
    <figure className="info--figures">
      <div className="followers--numbers">
        <span className="numbers">
          <p className="numbers-count">
            {user.followers ? (
              <p className="numbers-count">{user.followers}</p>
            ) : (
              <p>0</p>
            )}
          </p>
          <p className="numbers-text">Followers</p>
        </span>
        <span className="numbers">
          <p className="numbers-count">{user.following}</p>
          <p className="numbers-text">Following</p>
        </span>
      </div>
      <div className="info--icons">
        <div className="info">
          <span>
            <PiNotePencilFill className="info--icon" />
            <p>post</p>
          </span>
          <span>
            <AiOutlineFolderAdd className="info--icon" />
            <p>saved</p>
          </span>
        </div>
        <div className="info">
          <span>
            <BiSolidMessageAltDots className="info--icon" />
            <p>message</p>
          </span>
          <span>
            <PiGearBold className="info--icon" />
            <p>saved</p>
          </span>
        </div>
      </div>
    </figure>
  );
}

function BioContent({ user }) {
  return (
    <div className="bio--content">
      <h3 className="bio__heading">Personal Information</h3>
      <div className="bio--content--box">
        <ContentsInfo user={user} />
        <ContactsInfo user={user} />
      </div>
    </div>
  );
}

function ContentsInfo({ user }) {
  return (
    <div className="contents-box">
      <div className="content">
        <span>
          <FaUserAlt className="bio--icon" />
          <p>Bio</p>
        </span>
        {/* <p className='bio--text'>I’m a professional Photographer and Videographer with over 5 years of experience working as a freelancer and contract staff, i capture imaginary pictures and make awesome videos for a living.</p> */}
        <p className="bio--text">{user.bio}</p>
      </div>
      <div className="content">
        <span>
          <FaBicycle className="bio--icon" />
          <p>Interest</p>
        </span>
        {/* <p className='bio--text'>Photography, Video Creation, Cinematic Effects, Images, Adobe Creative Suites, Imaginary.</p> */}
        <p className="bio--text">{user.interest}</p>
      </div>
    </div>
  );
}

function ContactsInfo({ user }) {
  return (
    <div className="contents-box">
      <div className="content">
        <span>
          <LiaEnvelopeSolid className="bio--icon" />
          <p>Email</p>
        </span>
        <p className="bio--text">{user.email}</p>
      </div>
      <div className="content">
        <span>
          <FiPhone className="bio--icon" />
          <p>Phone</p>
        </span>
        <p>{user.telephone}</p>
      </div>
      <div className="content">
        <span>
          <PiGlobeSimpleBold className="bio--icon" />
          <p>Web</p>
        </span>
        {/* <p className='bio--text'>andrewtateportfolio.com</p> */}
        <p className="bio--text">{user.website}</p>
      </div>
    </div>
  );
}

export default BioInfoCreator;
