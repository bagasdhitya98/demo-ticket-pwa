import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Seambiosys from "../assets/icons/seambiosys.png";

import Layout from "../components/Layout";
import Input from "../components/Input";

const LoginPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth.username === "admin" && auth.password === "admin123") {
      Swal.fire({
        icon: "success",
        title: "Successfully login",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/main");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Check your username or password",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center items-center my-20 mx-20">
          <img src={Seambiosys} className="my-10 w-40 md:w-60" alt="logo" />
          <h1 className="text-4xl font-bold mb-4 text-orange-500 text-center">
            Welcome to Sales Order App
          </h1>
        </div>
        <div className="mx-20 my-auto">
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="w-full md:w-80 grid gap-y-3 px-4 md:px-0"
          >
            <Input
              onChange={handleChange}
              label={"Username"}
              name={"username"}
            />
            <Input
              onChange={handleChange}
              label={"Password"}
              name={"password"}
              type={"password"}
            />
            <button
              type="submit"
              className="w-full h-12 bg-blue-900 text-white focus:outline-none border-none font-semibold mt-8"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
