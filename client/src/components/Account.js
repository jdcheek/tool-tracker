import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const Account = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const mountedRef = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState({
    username: "",
    toolsCheckedOut: [],
  });

  const getAccountInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/auth/status/`, {
        withCredentials: true,
      });
      if (mountedRef.current) {
        setAccount({
          username: res.data.username,
          toolsCheckedOut: res.data.toolsCheckedOut,
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(account);
  useEffect(() => {
    getAccountInfo();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>Account</h2>
      <p>Username: {account.username}</p>
      <p>Change Password</p>
      <h4>Tools Checked Out</h4>
      <ul>
        {account.toolsCheckedOut.map((tool) => (
          <li key={Math.random()}>
            Tool: {tool.tool_number} Location: {tool.location.bin}-
            {tool.location.shelf}
          </li>
        ))}
      </ul>
      <p>Coming Soon...</p>
      <p>Report Damaged Tool</p>
    </div>
  );
};

export default Account;
