import React, { useState } from "react";
import {
  MDBValidation,
  MDBInput,
  MDBBtn,
  MDBTextArea,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

// fwlukplr
const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const { title, description, category, imageUrl } = formValue;

  const navigate = useNavigate();

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    return today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select a category");
    }
    if (title && description && category && imageUrl) {
      const currentDate = getDate();
      const updatedBlogData = { ...formValue, date: currentDate };
      const response = await axios.post(
        "http://localhost:5000/blogs",
        updatedBlogData
      );
      if (response.status === 201) {
        toast.success("Blog Created!");
      } else {
        toast.error("Something went wrong!!");
      }
      setFormValue({ title: "", description: "", category: "", imageUrl: "" });
      navigate("/");
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fwlukplr");
    axios
      .post("https://api.cloudinary.com/v1_1/dt4ripswl/image/upload", formData)
      .then((resp) => {
        // console.log("Response", resp);
        toast.info("Image uploaded successfully");
        setFormValue({ ...formValue, imageUrl: resp.data.url });
      })
      .catch((err) => {
        toast.info("Something wen't wrong");
      });
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">Add Blog</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBValidationItem feedback="Please provide a title" invalid>
          <MDBInput
            value={title || ""}
            name="title"
            type="text"
            onChange={onInputChange}
            required
            label="Title"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please provide a description" invalid>
          <MDBTextArea
            value={description || ""}
            name="description"
            type="text"
            onChange={onInputChange}
            required
            label="Description"
            rows={4}
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please choose an image" invalid>
          <MDBInput
            type="file"
            onChange={(e) => onUploadImage(e.target.files[0])}
            required
          />
        </MDBValidationItem>
        <br />
        <select
          name=""
          className="categoryDropdown"
          onChange={onCategoryChange}
          value={category}
        >
          <option>Please select category</option>
          {options.map((option, index) => (
            <option key={index} value={option || ""}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrMsg && (
          <div className="categoryErrorMsg">{categoryErrMsg}</div>
        )}
        <br />
        <br />
        <MDBBtn type="submit" style={{ marginRight: "10px" }}>
          Add
        </MDBBtn>
        <MDBBtn
          type="submit"
          color="danger"
          onClick={() => navigate("/")}
          style={{ marginRight: "10px" }}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditBlog;
