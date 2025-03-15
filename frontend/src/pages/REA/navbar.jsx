import React from "react";
import Logo from "./assets/logoSGC.jpeg";
import ProfileIcon from "./assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const navbar = () => {
  const data = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // Handle Profile Button Click
  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Handle Settings Button Click
  const handleSettingsClick = () => {
    navigate("/settings");
  };

  // Handle Signout Button Click
  const handleSignoutClick = () => {
    // Add signout logic here
    console.log("Signout clicked");
    navigate("/login");
  };

  return (
    <>
      {/* Header */}
      <header className="header sticky top-0 bg-white shadow-lg flex items-center justify-between px-[4rem] py-02 h-[8rem]">
        {/* Logo */}
        <img src={Logo} className="w-[7%] m-[1rem]" alt="logo" />

        {/* Navigation */}
        <div className="flex justify-center w-full">
          <nav className="flex nav font-semibold text-lg">
            <ul className="flex items-center">
              <Link to="/">
                <li className="p-[1.75rem] border-b-2 text-[1.65rem] border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer active">
                  Home
                </li>
              </Link>
              <Link to="/prd">
                <li className="p-[1.75rem] border-b-2 text-[1.65rem] border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
                  PRD Tools
                </li>
              </Link>
              <Link to="/rea-form">
                <li className="p-[1.75rem] border-b-2 text-[1.65rem] border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
                  Remuneration
                </li>
              </Link>
              <Link to="/niche">
                <li className="p-[1.75rem] border-b-2 text-[1.65rem] border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
                  Niche
                </li>
              </Link>
              <Link to="/chatbot">
                <li className="p-[1.75rem] border-b-2 text-[1.65rem] border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
                  Chatbot
                </li>
              </Link>
              <Link to="/dashboard">
                <li className="p-[1.75rem] border-b-2 text-[1.65rem] border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
                  Dashboard
                </li>
              </Link>
            </ul>
          </nav>
        </div>

        {/* Profile Dropdown */}
        <div className="flex justify-end w-[30%] items-center gap-x-5 px-2">
          <div className="font-semibold text-[1.65rem] text-gray-400">
            Hi, {data?.user?.name || "User"}
          </div>
          <div className="group relative">
            <button>
              <img
                className="mr-4 h-20 w-20 rounded-full"
                src={ProfileIcon}
                alt="profile-icon"
              />
            </button>
            {/* Dropdown Menu */}
            <div className="z-10 bg-white hidden absolute rounded-lg shadow w-32 group-hover:block right-0">
              <ul className="text-xl text-black">
                <li className="pt-2 hover:bg-gray-100 px-4 py-2">
                  <button
                    onClick={handleProfileClick}
                    className="w-full text-left"
                  >
                    Profile
                  </button>
                </li>
                <li className="pt-2 hover:bg-gray-100 px-4 py-2">
                  <button
                    onClick={handleSettingsClick}
                    className="w-full text-left"
                  >
                    Settings
                  </button>
                </li>
                <li className="pt-2 hover:bg-gray-100 px-4 py-2">
                  <button
                    onClick={handleSignoutClick}
                    className="w-full text-left"
                  >
                    Signout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default navbar;