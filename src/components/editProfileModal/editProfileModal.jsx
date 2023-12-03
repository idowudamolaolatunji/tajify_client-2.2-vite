import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Textarea,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import CurrencyInput from "react-currency-input-field";
import PropTypes from "prop-types";
import { HOST_URL } from "../../assets/js/help_func";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const { token, handleUser, handleChange } = useAuthContext();

  const [editedUser, setEditedUser] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [interest, setInterest] = useState("");
  const [fullname, setFullname] = useState("");
  const [website, setWebsite] = useState("");
  const [occupation, setOccupation] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      const result = await fetch(`${HOST_URL()}/users/update-my-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio: bio,
          fullname: fullname,
          occupation: occupation,
          interest: interest,
          website: website,
          telephone: telephone,
        }),
      });

      if (result.ok) {
        toast.success("Profile updated successfully!");
        // handleUser(result.data.data.user)
        handleChange(result.data.data.user);
        setBio("");
        setOccupation("");
        setInterest("");
        setWebsite("");
        setTelephone("");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent style={{ minHeight: "70vh" }}>
        <ModalHeader>
          <h1 className="text-2xl text-green-600">Edit Profile</h1>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="m-5">
            <FormControl id="username">
              <FormLabel style={{ fontSize: "1.3rem" }}>Username</FormLabel>
              <input
                type="text"
                name="username"
                value={editedUser.username}
                // onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="username">
              <FormLabel style={{ fontSize: "1.3rem" }}>Fullname</FormLabel>
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="email">
              <FormLabel style={{ fontSize: "1.3rem" }}>Email</FormLabel>
              <input
                type="text"
                name="email"
                value={editedUser.email}
                // onChange={handleInputChange}
                // onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="occupation">
              <FormLabel style={{ fontSize: "1.3rem" }}>Occupation</FormLabel>
              <input
                type="text"
                name="occupation"
                value={occupation}
                // onChange={handleInputChange}
                onChange={(e) => setOccupation(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="website">
              <FormLabel style={{ fontSize: "1.3rem" }}>
                Website or link
              </FormLabel>
              <input
                type="text"
                name="website"
                // value={editedUser.website}
                value={website}
                // onChange={handleInputChange}
                onChange={(e) => setWebsite(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>

          <div className="m-5">
            <FormControl id="phone">
              <FormLabel style={{ fontSize: "1.3rem" }}>Phone Number</FormLabel>
              <input
                type="phone"
                name="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="interest">
              <FormLabel style={{ fontSize: "1.3rem" }}>interest</FormLabel>
              <input
                type="text"
                name="interest"
                value={interest}
                // value={editedUser.interest}
                // onChange={handleInputChange}
                onChange={(e) => setInterest(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="bio">
              <FormLabel style={{ fontSize: "1.3rem" }}>Bio</FormLabel>
              <Textarea
                name="bio"
                className="text-lg"
                value={bio}
                // value={editedUser.bio}
                // onChange={handleInputChange}
                onChange={(e) => setBio(e.target.value)}
                borderBottom="1px solid #CBD5E0" // Customize border bottom
                // You can customize other textarea styles as needed
              />
            </FormControl>
          </div>
          {/* Add more fields for other profile information */}
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-between w-[152px]">
            <Button
              onClick={onClose} // Close the modal when "Cancel" is clicked
              colorScheme="red"
              className=" py-4 px-8 bg-[#FF0066] rounded-lg font-semibold text-white text-lg flex items-center gap-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateProfile}
              colorScheme="green"
              className="py-4 px-8 bg-green-600 rounded-lg font-semibold text-lg text-white flex items-center gap-2"
            >
              Save Changes
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};

export default EditProfileModal;
