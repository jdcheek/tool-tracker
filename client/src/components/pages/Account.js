import React, { useContext, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../lib/LoadingSpinner";
import { UserContext } from "../context/UserContext";
import AddInventoryModal from "../modals/AddInventoryModal";

const Account = ({ getAccountInfo }) => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [addToolModalShow, setAddToolModalShow] = useState(false);
  const [newUserModalShow, setNewUserModalShow] = useState(false);
  const [manageUserModalShow, setManageUserModalShow] = useState(false);

  const checkInItem = async (e, tool) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <div className='side-bar'>
      <AddInventoryModal
        show={addToolModalShow}
        onHide={() => setAddToolModalShow(false)}
      />
      <h3>{currentUser.username}</h3>
      {currentUser.toolsCheckedOut.length > 0 ? (
        <h5>Tools Checked Out</h5>
      ) : (
        <h5>No Tools Out</h5>
      )}
      <div className='tool-list'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ul>
            {currentUser.toolsCheckedOut.map((tool) => (
              <li className='tool-list-item' key={Math.random()}>
                {tool.tool_number}: {tool.location.bin}-{tool.location.shelf}
                <Button
                  className='check-in-btn'
                  variant='outline-primary'
                  onClick={(e) => checkInItem(e, tool)}>
                  Check In
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='manage-section'>
        {currentUser.isAdmin && (
          <>
            <h5>Admin Actions</h5>
            <Button
              variant='outline-dark'
              onClick={() => setAddToolModalShow(true)}>
              New Tool
            </Button>
            <Button variant='outline-dark'>New User</Button>
            <Button variant='outline-dark'>Manage Users</Button>
          </>
        )}
        <h5>Manage Account</h5>
        <Button variant='outline-dark'>Change Password</Button>
        {!currentUser.isAdmin && (
          <Button onClick={() => alert("Request sent.")} variant='outline-dark'>
            Request Administrator Access
          </Button>
        )}
      </div>
    </div>
  );
};

export default Account;
