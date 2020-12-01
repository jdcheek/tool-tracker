import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import InventoryCard from "./InventoryCard";
import Pagination from "./Pagination";

//TODO allow logged in user to check out item
//TODO add loading spinner

export default function Inventory() {
  const mountedRef = useRef(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [inventory, setInventory] = useState([]);
  const [currentQuery, setCurrentQuery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState({
    query: "",
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentQuery.slice(indexOfFirstItem, indexOfLastItem);
  const pages = Math.ceil(currentQuery.length / itemsPerPage);

  useEffect(() => {
    getInventory();
    return () => (mountedRef.current = false);
  }, []);

  useEffect(() => {
    setCurrentQuery(
      inventory.filter((item) => item.tool_number.includes(search.query))
    );
  }, [search]);

  const getInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory", {
        withCredentials: true,
      });
      if (mountedRef.current) {
        setInventory(res.data);
        // Conditional to keep search active while inventory updates
        if (currentQuery.length >= 1 && currentQuery.length < res.data.length) {
          setCurrentQuery(
            res.data.filter((item) => item.tool_number.includes(search.query))
          );
        } else {
          setCurrentQuery(res.data);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkOutItem = async (tool) => {
    try {
      const inv = await axios.post(
        `http://localhost:5000/inventory/update/status/${tool._id}`,
        {
          status: {
            checked_out: true,
            username: currentUser.username,
            date: new Date(),
          },
        },
        { withCredentials: true }
      );
      getInventory();
    } catch (error) {
      console.log(error);
    }
    try {
      const usr = await axios.post(
        `http://localhost:5000/user/tools`,
        {
          id: tool._id,
          tool_number: tool.tool_number,
          location: tool.location,
          user: currentUser.username,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const searchInventory = (e) => {
    setLoading(true);
    e.preventDefault();
    setSearch({ ...search, query: e.target.value.toUpperCase() });
    setCurrentPage(1);
    setLoading(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search-bar'>Search</label>
        <input type='text' value={search.query} onChange={searchInventory} />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <InventoryCard
            currentUser={currentUser}
            currentItems={currentItems}
            currentQuery={currentQuery}
            checkOutItem={checkOutItem}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={currentQuery.length}
            pages={pages}
            setItemsPerPage={setItemsPerPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}
