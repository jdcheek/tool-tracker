import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";

export default function Dashboard() {
  const mountedRef = useRef(true);
  const [inventory, setInventory] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory", {
        withCredentials: true,
      });
      if (mountedRef.current) {
        setInventory(res.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    let list = [];
    try {
      const res = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
      res.data.map((user) =>
        list.push({
          username: user.username,
          _id: user._id,
          isAdmin: user.isAdmin,
        })
      );
      if (mountedRef.current) {
        setUserList(list);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(`Get users error: ${err}`);
    }
  };

  useEffect(() => {
    getUsers();
    getInventory();
    return () => (mountedRef.current = false);
  }, []);

  return <div>dashboard</div>;
}
