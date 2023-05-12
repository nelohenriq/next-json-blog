import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";

const Home = () => {
  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

  useEffect(() => {
    loadBlogsData();
    getLatestBlog();
  }, []);

  const loadBlogsData = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const getLatestBlog = async () => {
    const allBlogs = await axios.get("http://localhost:5000/blogs");
    const start = allBlogs.data.length - 4;
    const end = allBlogs.data.length;
    const response = await axios.get(
      `http://localhost:5000/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setLatestBlog(response.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  // console.log("data", data);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog deleted!");
        loadBlogsData();
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }
    return str;
  };

  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData();
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:5000/blogs/?q=${searchValue}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleCategory = async (category) => {
    const response = await axios.get(
      `http://localhost:5000/blogs/?category=${category}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0">
            No Blog Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data &&
                data.map((item, index) => (
                  <Blogs
                    key={index}
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                  />
                ))}
            </MDBRow>
            {/* <Pagination /> */}
          </MDBContainer>
        </MDBCol>
        <MDBCol size={3}>
          <h4>Latest Posts</h4>
          {latestBlog &&
            latestBlog.map((item, index) => (
              <LatestBlog key={index} {...item} />
            ))}
          <Category options={options} handleCategory={handleCategory} />
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Home;
