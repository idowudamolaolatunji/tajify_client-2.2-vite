import React, { useEffect, useState } from "react";
import { PiNotePencilFill, PiGearBold } from "react-icons/pi";
import { BiSolidMessageAltDots } from "react-icons/bi";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { FaUserAlt, FaBicycle } from "react-icons/fa";
import { LiaEnvelopeSolid } from "react-icons/lia";
import { FiPhone } from "react-icons/fi";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { useAuthContext } from "../../../context/AuthContext";
import { HOST_URL } from "../../../assets/js/help_func";
import axios from "axios";

const GET_USER_OBJ_URL = `${HOST_URL()}/users/getMyObj`;

function BioInfo() {
  const { token, user, refetchHelp } = useAuthContext();
  const [bioInfo, setBioInfo] = useState([]);

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
        setBioInfo([userObj.data.data.user]);
      } else {
        console.error("Error fetching user object");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(bioInfo[0]?.email);

  // Render first upon every page reload
  useEffect(() => {
    getCurrentUserUpdatedObj();
  }, []);
  return (
    <section className="bio__section">
      <div className="section__container">
        <div className="bio--cards">
          <figure className="info--figures">
            <div className="followers--numbers">
              <span className="numbers">
                <p className="numbers-count">
                  {bioInfo.followers ? (
                    <p className="numbers-count">{bioInfo[0]?.followers}</p>
                  ) : (
                    <p>0</p>
                  )}
                </p>
                <p className="numbers-text">Followers</p>
              </span>
              <span className="numbers">
                <p className="numbers-count">
                  {bioInfo.followers ? (
                    <p className="numbers-count">{bioInfo[0]?.following}</p>
                  ) : (
                    <p>0</p>
                  )}
                </p>
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
          <div className="bio--content">
            <h3 className="bio__heading">Personal Information</h3>
            <div className="bio--content--box">
              <div className="contents-box">
                <div className="content">
                  <span>
                    <FaUserAlt className="bio--icon" />
                    <p>Bio</p>
                  </span>
                  <p className="bio--text">{bioInfo[0]?.bio}</p>
                </div>
                <div className="content">
                  <span>
                    <FaBicycle className="bio--icon" />
                    <p>Interest</p>
                  </span>
                  <p className="bio--text">{bioInfo[0]?.interest}</p>
                </div>
              </div>
              <div className="contents-box">
                <div className="content">
                  <span>
                    <LiaEnvelopeSolid className="bio--icon" />
                    <p>Email</p>
                  </span>
                  <p className="bio--text">{bioInfo[0]?.email}</p>
                </div>
                <div className="content">
                  <span>
                    <FiPhone className="bio--icon" />
                    <p>Phone</p>
                  </span>
                  <p>{bioInfo[0]?.telephone}</p>
                </div>
                <div className="content">
                  <span>
                    <PiGlobeSimpleBold className="bio--icon" />
                    <p>Web</p>
                  </span>
                  {/* <p className='bio--text'>andrewtateportfolio.com</p> */}
                  <p className="bio--text">{bioInfo[0]?.website}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// function BioFigure({ bioInfo }) {
//   return (
//     <figure className="info--figures">
//       <div className="followers--numbers">
//         <span className="numbers">
//           <p className="numbers-count">
//             {bioInfo.followers ? (
//               <p className="numbers-count">{bioInfo[0]?.followers}</p>
//             ) : (
//               <p>0</p>
//             )}
//           </p>
//           <p className="numbers-text">Followers</p>
//         </span>
//         <span className="numbers">
//           <p className="numbers-count">{bioInfo[0]?.following}</p>
//           <p className="numbers-text">Following</p>
//         </span>
//       </div>
//       <div className="info--icons">
//         <div className="info">
//           <span>
//             <PiNotePencilFill className="info--icon" />
//             <p>post</p>
//           </span>
//           <span>
//             <AiOutlineFolderAdd className="info--icon" />
//             <p>saved</p>
//           </span>
//         </div>
//         <div className="info">
//           <span>
//             <BiSolidMessageAltDots className="info--icon" />
//             <p>message</p>
//           </span>
//           <span>
//             <PiGearBold className="info--icon" />
//             <p>saved</p>
//           </span>
//         </div>
//       </div>
//     </figure>
//   );
// }

// function BioContent({ bioInfo }) {
//   return (
//     <div className="bio--content">
//       <h3 className="bio__heading">Personal Information</h3>
//       <div className="bio--content--box">
//         {bioInfo.map((item, index) => (
//           <ContentsInfo key={index} bioInfo={item} />
//         ))}
//         {bioInfo.map((item, index) => (
//           <ContactsInfo key={index} bioInfo={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function ContentsInfo({ bioInfo }) {
//   return (
//     <div className="contents-box">
//       <div className="content">
//         <span>
//           <FaUserAlt className="bio--icon" />
//           <p>Bio</p>
//         </span>
//         {/* <p className='bio--text'>I’m a professional Photographer and Videographer with over 5 years of experience working as a freelancer and contract staff, i capture imaginary pictures and make awesome videos for a living.</p> */}
//         <p className="bio--text">{bioInfo[0]?.bio}</p>
//       </div>
//       <div className="content">
//         <span>
//           <FaBicycle className="bio--icon" />
//           <p>Interest</p>
//         </span>
//         {/* <p className='bio--text'>Photography, Video Creation, Cinematic Effects, Images, Adobe Creative Suites, Imaginary.</p> */}
//         <p className="bio--text">{bioInfo[0]?.interest}</p>
//       </div>
//     </div>
//   );
// }

// function ContactsInfo({ bioInfo }) {
//   return (
//     <div className="contents-box">
//       <div className="content">
//         <span>
//           <LiaEnvelopeSolid className="bio--icon" />
//           <p>Email</p>
//         </span>
//         <p className="bio--text">{bioInfo?.email}</p>
//       </div>
//       <div className="content">
//         <span>
//           <FiPhone className="bio--icon" />
//           <p>Phone</p>
//         </span>
//         {/* <p>{bioInfo.telephone}</p> */}
//       </div>
//       <div className="content">
//         <span>
//           <PiGlobeSimpleBold className="bio--icon" />
//           <p>Web</p>
//         </span>
//         {/* <p className='bio--text'>andrewtateportfolio.com</p> */}
//         <p className="bio--text">{bioInfo?.website}</p>
//       </div>
//     </div>
//   );
// }

export default BioInfo;
