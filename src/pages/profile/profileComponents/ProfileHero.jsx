import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import axios from "axios"; // Import Axios
import editProfileModal from "../../../components/editProfileModal/editProfileModal";
import { useAuthContext } from "../../../context/AuthContext";
import EditProfileModal from "../../../components/editProfileModal/editProfileModal";
import { FiEdit2 } from "react-icons/fi";
import { Avatar } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { HOST_URL } from "../../../assets/js/help_func";

function ProfileHero() {
  const IMAGE_UPLOAD_URL = `${HOST_URL()}/users/update-my-profile-picture`; 
  // Replace with your actual API endpoint

  const { token, user, refetchHelp, handleUser } = useAuthContext();
  const [profileImage, setProfileImage] = useState();
  const [image, setImage] = useState();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
 

  const handleUpdateProfile = (updatedProfile) => {
    // Update the user's profile data in your state or make an API request
    setUserProfile(updatedProfile);
    // You can add logic here to update the profile data on the server
  };

  // UPLOAD IMAGE TO CLOUDINARY AND POST TO ENDPOINT
  const handleImage = async (e) => {
    const file = e.target.files[0];

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dlvm6us0n/image/upload",
        formData
      );

      if (cloudinaryResponse.status === 200) {
        // Image uploaded successfully to Cloudinary
        const imageUrl = cloudinaryResponse.data.secure_url;

        // Now, send a post request to your server with the imageUrl
        const serverResponse = await axios.patch(
          IMAGE_UPLOAD_URL, // Replace with your server API endpoint
          { imageUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (serverResponse.status === 200) {
          // Server successfully received the image URL
          handleUser(serverResponse.data.data)
          setImage(serverResponse.data.data.profileImage)
          console.log("Image uploaded and server notified");
          toast.success("successfully updated profile picture");
        } else {
          console.error(
            "Server failed to process the image:",
            serverResponse.data
          );
        }
      } else {
        console.error(
          "Image upload to Cloudinary failed:",
          cloudinaryResponse.data
        );
      }
    } catch (error) {
      console.error("Error handling image:", error);
    }
  };

  useEffect(() => {}, [refetchHelp]);
  console.log(user);
  console.log(handleUser)

  return (
    <section className="profile-hero__section">
      <div className="section__container profile-hero">
        <div className="profile-hero__details">
          <div className="profile-hero__image--box">
            {user ? (
              <img className="profile-hero__image" src={user.image} alt />
            ) : (
              <Avatar size={"lg"} />
            )}
            {/* {image ? (
              <img className="profile-hero__image" src={image} alt />
            ) : (
              <Avatar size={"lg"} />
            )} */}

            <span>
              <label htmlFor="image-upload" className="image__icon">
                <FaCamera className="image__icon" />
                <input
                  type="file"
                  id="image-upload"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleImage}
                  className="opacity-0"
                />
              </label>
            </span>
          </div>

          <div className="profile-hero__content">
            <h4 className="profile-hero__fullname">{user.fullname}</h4>
            <p className="profile-hero__username">{user.username}</p>
            <p className="profile-hero__tags">{user.occupation}</p>
          </div>
          <div className="edit__profile flex justify-between ">
            <button
              // className="profile-hero__button"
              className="profile-hero__button"
              // onClick={uploadProfileImage}
            >
              <AiOutlinePlus />
              Add Cover Image
            </button>
            <button
              className="profile-hero__button__edit"
              onClick={() => setIsEditProfileModalOpen(true)}
            >
              <FiEdit2 />
              Edit Profile
            </button>
          </div>

          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
        <div>&nbsp;</div>
      </div>
    </section>
  );
}

export default ProfileHero;
