import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";

const RegistrationPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();

  const handleOnChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_pic" && files.length > 0) {
      const file = files[0];
      const uploadedUrl = await uploadFile(file); // Upload file to Cloudinary

      if (uploadedUrl) {
        setData((prev) => ({
          ...prev,
          profile_pic: uploadedUrl, // Set Cloudinary image URL
        }));
      }
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = () => {
    document.getElementById("profile_pic").click();
  };

  const handleDeletePhoto = () => {
    setData((prev) => ({
      ...prev,
      profile_pic: null,
    }));
    document.getElementById("profile_pic").value = null; // Reset the file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`
  
    try {
      const res = await axios.post(URL, data,{
        headers: {
          "Content-Type":"application/json",
        },
      });

      console.log("response",res);
      toast.success(res.data.message);

      if(res.data.success){
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        });
        navigate('/email')
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message);
    }

  };

  return (
    <div className="mt-5 mb-5">
      <div className="w-full max-w-sm mx-auto mx-2 bg-white rounded overflow-hidden p-4">
        <h3 className="welcomeText text-center">Welcome To Chat App</h3>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Profile Picture</label>
            <div
              className="h-14 bg-slate-300 flex justify-center items-center border-2 cursor-pointer rounded hover:border-cyan-700"
              onClick={handleFileUpload} // Trigger file upload on click
            >
              <p className="text-sm">Upload Profile Photo</p>
            </div>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="hidden"
              accept="image/*"
              onChange={handleOnChange} // Capture file input change
            />

            {data.profile_pic && (
              <div className="mt-4 relative">
                <img
                  src={data.profile_pic}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  className="absolute top-0 right-0 p-1 rounded-full px-3 text-black"
                >
                  &#10060;
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button className="welcomeText text-white bg-primary text-lg px-4 py-1 rounded hover:bg-secondary transition-colors duration-300 ease-in-out">
              Register
            </button>
          </div>
        </form>
        <p className="my-3">
          Already have an account?{" "}
          <Link
            to="/email"
            className="hover:text-primary hover:underline font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
