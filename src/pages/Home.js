import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadBlogsData();
  }, []);

  const loadBlogsData = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  console.log("data", data);

  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

export default Home;
