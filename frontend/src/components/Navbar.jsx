import React, { useState, useEffect } from "react";
import navbar from "./assets/navbar.png";
import logo from "./assets/logoSGC.jpeg";
import profile from "./assets/profile.png";
import { useSelector } from "react-redux";
const Navbar = () => {
  const data = useSelector((state) => state.user.user);
  // console.log("navbar", data);
  return (
    <nav className=" w-full  h-24  bg-[#FFFFFF] flex justify-between fixed  z-50">
      <div className="flex items-center text-xl px-2 py-2  ">
        <img
          className=" ml-[2rem] h-[3.75rem] w-[8.5rem] cursor-pointer inline-block"
          src={logo}
          alt=""
        />
        <span className="ml-[1rem] text-purple-500 text-4xl font-bold ">
          AI
        </span>
      </div>
      <div className="flex items-center gap-x-5 px-2">
        <div className="font-bold text-xl text-gray-400">
          Welcome, {data.user.displayName}
        </div>
        <button className=" group">
          <img
            className=" mr-4 h-12 w-12 rounded-full"
            src={data.user.image}
            // src={profile}
            alt="profile-icon"
          />
          <div className="z-10 bg-white hidden absolute rounded-lg shadow w-32 group-focus:block right-0">
            <ul className=" text-xl text-black">
              <li className="pt-2">
                <a href="">Profile</a>
              </li>
              <li className="pt-2">
                <a href="">Setting</a>
              </li>
              <li className="pt-2">
                <a href="">Signout</a>
              </li>
            </ul>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
