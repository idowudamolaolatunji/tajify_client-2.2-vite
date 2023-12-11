import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

const { id } = useParams(); // This retrieves the ID from the URL parameter
const { user, token } = useAuthContext();
const [creator, setCreator] = useState([]);
const [userId, setUserId] = useState();
const [creatorslug, setCreatorSlug] = useState();

const USER_URL = `http://localhost:3005/api/users/${id}`;

const headers = {
    // 'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

export default fetchData = async () => {
  try {
    const response = await axios.get(USER_URL);
    // const response = await axios.get(`https://api.tajify.com/api/users/${id}`);

    if (response.data.data.user) {
      // Handle the fetched data and set it in state
      // setPosts(response.data);
      console.log(response);
      setCreator(response.data.data.user);
      setCreatorSlug(response.data.data.user.slug);
      const listallrequest = response.data.data.user.followerRequestsReceived;
      const userid = user._id;
      console.log(userid);
      console.log(listallrequest);

      const filteredUsers = listallrequest.filter(
        (listallrequest) => user._id === listallrequest
      );

      console.log(filteredUsers);
      if (filteredUsers.length > 0) {
        console.log("User(s) found:");
        setIsFollowing(true);
      } else {
        console.log("No user found with the specified username.");
      }
      // setCreatorSlug(response.data.data.user.username);
      setUserId(response.data.data.user._id);
    } else {
      console.error("Error fetching user");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

