import React from "react";
import logo from "./assets/logo.png";
import prompt from "./assets/prompt.png";
import Navbar from "./Navbar";
import { BsArrowLeftShort } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { BsPersonFillCheck } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./../redux/userSlice";
import { RxDashboard } from "react-icons/rx";
const SidebarTail = () => {
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
      {/* <div className="relative"> */}
      <Navbar />
      {/* </div> */}

      <div
        className={`h-screen  ${
          open ? "w-80" : "w-24"
        } duration-300 bg-[#F5F7FF] text-white font-bold fixed  px-4 py-2 mt-24 flex flex-col`}
      >
        <div className="">
          <div className="flex">
            <BsArrowLeftShort
              className={`h-10 w-10 bg-white text-secondary text-3xl rounded-full absolute -right-3 top-9 border border-light-grey cursor-pointer ${
                !open && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
            />
            <h1 className={`text-2xl text-white font-bold px-2 `}>
              <Link to=".">
                <div
                  className={`h-15 w-15 rounded-full bg-secondary inline-block mr-2 mt-2 mb-2 duration-500 ${
                    open && "rotate-[360deg]"
                  } `}
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
                  } ${!open && "duration-300"} `}
                >
                  Article Writer
                </span>
              </Link>
            </h1>
          </div>
          <hr className="border-black" />
          <ul className=" mt-2">
            <Link to="/">
              <li
                className={`ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black duration-300`}
              >
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration -300 ${
                    !open && "hidden"
                  } ${!open && "duration-300"}`}
                >
                  Article-Prompt
                </span>
              </li>
            </Link>
            <Link to="/article-form/">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration -300 ${
                    !open && "hidden"
                  } ${!open && "duration-300"}`}
                >
                  Article-Form
                </span>
              </li>
            </Link>
            <Link to="/loa-prompt/">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration-300 ${!open && "hidden"} ${
                    !open && "duration-300"
                  }`}
                >
                  LOA-Prompt
                </span>
              </li>
            </Link>
            <Link to="/loa-form/">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration-300 ${
                    !open && "hidden"
                  } transition-opacity `}
                >
                  LOA-Form
                </span>
              </li>
            </Link>
            <Link to="/lor">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration-300 ${!open && "hidden"} ${
                    open && "duration-300"
                  }`}
                >
                  LOR-Prompt
                </span>
              </li>
            </Link>
            <Link to="/lor-form">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration-300 ${!open && "hidden"} ${
                    open && "duration-300"
                  }`}
                >
                  LOR-Form
                </span>
              </li>
            </Link>
            <Link to="/bio-writer-prompt/">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration-300 ${!open && "hidden"} ${
                    open && "duration-300"
                  }`}
                >
                  BioWriter-Prompt
                </span>
              </li>
            </Link>
            <Link to="/bio-writer/">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration-300 ${!open && "hidden"} ${
                    open && "duration-300"
                  }`}
                >
                  BioWriter-Form
                </span>
              </li>
            </Link>
            <Link to="/niche/">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration-300 ${!open && "hidden"} ${
                    open && "duration-300"
                  }`}
                >
                  Niche Writer
                </span>
              </li>
            </Link>
            <Link to="/client/">
              <li className="ml-2 mb-2 rounded hover:shadow hover:bg-white hover:text-primary py-2 pt-2 text-black">
                <img
                  className="h-12 w-12 inline-block p-2"
                  src={prompt}
                  alt="logo"
                />
                <span
                  className={`ml-2 text-2xl duration-300 ${!open && "hidden"} ${
                    open && "duration-300"
                  }`}
                >
                  Client Chatbot
                </span>
              </li>
            </Link>
            <li className="rounded py-2 pt-2 text-black">
              <Link to="/chatbot/">
                <button className="ml-2 mb-2 p-2 mr-1  rounded-xl bg-secondary text-white text-xl">
                  <CiCirclePlus
                    className={`h-11 w-11 inline-block ${!open && "pr-2"}`}
                  />
                  <span
                    className={`ml-1 text-2xl duration-300 px-2 ${
                      !open && "hidden"
                    } ${open && "w-64 duration-300"}`}
                  >
                    ChatBot
                  </span>
                </button>
              </Link>
            </li>

            <li className="rounded py-2 pt-2 text-black">
              {/* {user.user.isAdmin === "Admin" && ( */}
              <Link to="/dashboard">
                <button className="ml-2 mb-2 py-2 px-2  rounded-xl bg-secondary text-white text-xl">
                  <RxDashboard
                    className={`h-8 w-8 inline-block ${!open && "pr-2"}`}
                  />
                  <span
                    className={`ml-1 text-2xl pt-4 duration-300 px-4 ${
                      !open && "hidden"
                    } ${open && "w-64 duration-300"}`}
                  >
                    Dashboard
                  </span>
                </button>
              </Link>
              {/* )} */}
            </li>
          </ul>
        </div>
        <div className="mt-2">
          <div className=" ml-2 mb-2 p-1 mr-1  rounded-xl bg-secondary mt-3 text-white text-xl">
            <Link to="/add-data">
              <CiSettings
                className={`h-10 w-10 inline-block ${!open && "pr-2"}`}
              />
              <span
                className={`ml-1 px-2  text-2xl duration-300 ${
                  !open && "hidden"
                } ${open && "w-64 duration-300"}`}
              >
                Add Data
              </span>
            </Link>
          </div>
          <button
            className=" ml-2  rounded-xl  bg-secondary p-2 mr-1 text-white text-xl"
            onClick={handleLogout}
          >
            <BsPersonFillCheck
              className={`h-10 w-10 inline-block ${!open && "pr-2"}`}
            />
            <span
              className={`ml-1 text-2xl pr-4 px-2 duration-300 ${
                !open && "hidden"
              } ${open && "w-64 duration-300"}`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarTail;
