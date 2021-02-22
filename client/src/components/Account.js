import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { UserContext } from "./UserContext";

const Account = ({ getAccountInfo }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const mountedRef = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  const checkInItem = async (e, tool) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line
      const inv = await axios.post(
        `http://localhost:5000/inventory/update/status/${tool.id}`,
        {
          status: {
            checked_out: false,
            username: "",
            date: new Date(),
          },
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    try {
      // eslint-disable-next-line
      const usr = await axios.post(
        `http://localhost:5000/user/tools`,
        {
          id: tool.id,
          tool_number: tool.tool_number,
          location: tool.location,
          user: currentUser.username,
          checkIn: true,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    getAccountInfo();
  };

  useEffect(() => {
    getAccountInfo();
    setIsLoading(false);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <h2>{currentUser.username}</h2>
      <h5>Tools Checked Out</h5>
      <ul>
        {currentUser.toolsCheckedOut.map((tool) => (
          <li key={Math.random()}>
            {tool.tool_number} Location: {tool.location.bin}-
            {tool.location.shelf}
            <button onClick={(e) => checkInItem(e, tool)}>Check In</button>
          </li>
        ))}
      </ul>
      <p>Coming Soon...</p>
      <p>Change Password</p>
    </div>
  );
};

export default Account;
