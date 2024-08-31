import React from "react";
import logo from "./assets/logo.png";
import prompt from "./assets/prompt.png";
import Navbar from "./Navbar";
import { BsArrowLeftShort, BsPersonFillCheck } from "react-icons/bs";
import { CiSettings, CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./../redux/userSlice";
import { RxDashboard } from "react-icons/rx";

const SidebarChatbot = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div
        className={`h-[90vh] ${
          open ? " w-80" : "w-24"
        } duration-300 bg-[#F5F7FF] text-white font-bold fixed px-4 py-2 mt-24 flex flex-col`}
      >
        <div className="flex items-start flex-col justify-between">
          <div className="flex">
            <BsArrowLeftShort
              className={`h-10 w-10 bg-white text-secondary text-3xl rounded-full absolute -right-3 top-9 border border-light-grey cursor-pointer ${
                !open && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
            />
            <h1 className={`text-2xl text-white font-bold px-2`}>
              <Link to=".">
                <div
                  className={`h-15 w-15 rounded-full bg-secondary inline-block mr-2 mt-2 mb-2 duration-500 ${
                    open && "rotate-[360deg]"
                  }`}
                >
                  <img
                    className="h-12 w-12 inline-block p-2"
                    src={logo}
                    alt="logo"
                  />
                </div>
                <span
                  className={`ml-2 text-black duration-300 ${
                    !open && "hidden"
                  }`}
                >
                  Chatbots
                </span>
              </Link>

              <hr
                className={`border-t-2 items-center  border-black w-full ${
                  open ? "ml-10" : "ml-0"
                }`}
              />
            </h1>
          </div>

          <ul className="mt-2 flex-1">
            {[
              { to: "/chatbot", text: "Internal Chatbot" },
              { to: "/client", text: "Sales Chatbot" },
            ].map((item, index) => (
              <Link to={item.to} key={index}>
                <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black flex items-center">
                  <img
                    className="h-12 w-12 inline-block p-2"
                    src={prompt}
                    alt="logo"
                  />
                  <span
                    className={`ml-2 text-2xl duration-300 ${
                      !open && "hidden"
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
          <div className="mt-4 flex flex-col items-start">
            <div className="flex">
              <Link to="/add-data">
                <button
                  className={`ml-2 p-2 rounded-xl bg-secondary text-white text-xl flex items-center ${
                    open ? "h-12 w-64" : "h-12 w-12"
                  }`}
                >
                  <RxDashboard className={`h-10 w-10 ${!open && "pr-2"}`} />
                  <span
                    className={`ml-1 text-2xl pt-1 duration-300 ${
                      !open ? "hidden" : "w-64"
                    }`}
                  >
                    Add-Data
                  </span>
                </button>
              </Link>
            </div>
            <div className="flex mt-2">
              <button
                className={`ml-2 rounded-xl p-2 bg-secondary text-white text-xl flex items-center ${
                  open ? "h-12 w-64" : "h-12 w-12"
                }`}
                onClick={handleLogout}
              >
                <BsPersonFillCheck className={`h-10 w-10 ${!open && "pr-2"}`} />
                <span
                  className={`ml-1 text-2xl duration-300 ${
                    !open ? "hidden" : "w-64"
                  }`}
                >
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarChatbot;
