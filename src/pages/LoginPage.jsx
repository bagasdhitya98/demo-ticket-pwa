import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
      <div className="flex flex-col text-center justify-center my-20">
        <h1 className="text-4xl font-bold mb-4 text-orange-500">
          Welcome to Our Demo Site
        </h1>
        <p className="text-blue-900">
          This site is provided for demonstration purposes, showcasing order
          creation, checking order lists, and payment via a payment gateway.
        </p>
        <p className="text-blue-900">
          Explore the convenience and functionality we offer in the online
          ordering and payment process.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-80 grid gap-y-3">
        <Input onChange={handleChange} label={"Username"} name={"username"} />
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
    </Layout>
  );
};

export default LoginPage;
