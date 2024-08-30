import React, { useState, useEffect } from "react";
import navbar from "./assets/navbar.png";
import logo from "./assets/logoSGC.jpeg";
import profile from "./assets/profile.png";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
const Navbar = () => {
  const data = useSelector((state) => state.user.user);
  // console.log("navbar", data);
  return (
    <>
    {/* component */}
    <header className="header sticky top-0 bg-white shadow-lg flex items-center justify-betwee px-[4rem] py-02 h-[8rem]">
      {/* logo */}
      <img
      src={logo}
      className='w-[7%] m-[1rem]'
      />
      {/* navigation */}
      <div className='flex justify-center w-full'>
      <nav className="flex nav font-semibold text-lg">
        <ul className="flex items-center">
        <Link to="/">
          <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer active">
            Home
          </li>
          </Link>
          <Link to="/prd">
          <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
            PRD Tools
          </li>
          </Link>
          <Link to="/rea-form">
          <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
            Remuneration
          </li>
          </Link>
          <Link to="/niche">
          <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
            Niche
          </li>
          </Link>
          <Link to="">
          <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
            Chatbot
          </li>
          </Link>
          <Link to=''>
          <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
            Dashboard
          </li>
          </Link>
        </ul>

      </nav>
      </div>
      <div className="flex justify-end w-[30%] items-center gap-x-5 px-2">
      <div className="font-semibold text-[1.65rem] text-gray-400">
        {/* Hi, {data.user.displayName} */}
        Hi Kamran Khot
      </div>
      <button className=" group">
        <img
          className=" mr-4 h-20 w-20 rounded-full"
          // src={data.user.image}
          src={profile}
          alt="profile-icon"
        />
        {/* Image */}
        <div className="z-10 bg-white hidden absolute rounded-lg shadow w-32 group-focus:block right-0">
          <ul className=" text-xl text-black">
            <li className="pt-2">
              <Link to="">Profile</Link>
            </li>
            <li className="pt-2">
              <Link to="">Setting</Link>
            </li>
            <li className="pt-2">
              <Link to="">Signout</Link>
            </li>
          </ul>
        </div>
      </button>
    </div>
      {/* buttons -*/}
      
    </header>
  </>
  );
};

export default Navbar;
