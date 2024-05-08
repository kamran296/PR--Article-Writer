import React from "react";
import logo from "./assets/logo.png";
import prompt from "./assets/prompt.png";
import Navbar from "./Navbar";
import { BsArrowLeftShort } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { BsPersonFillCheck } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";
const SidebarTail = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Navbar />
      <div
        className={`${
          open ? "w-80" : "w-24"
        } duration-300 bg-[#F5F7FF] text-white font-bold fixed h-full px-4 py-2`}
      >
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
                className={`ml-2 text-black duration-300 ${!open && "hidden"} ${
                  !open && "duration-300"
                } `}
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
                className={`ml-2 text-2xl duration -300 ${!open && "hidden"} ${
                  !open && "duration-300"
                }`}
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
                className={`ml-2 text-2xl duration -300 ${!open && "hidden"} ${
                  !open && "duration-300"
                }`}
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
          <Link to="">
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
          <Link to="">
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
          <li className=" mb-2 rounded   py-2 pt-2 text-black">
            <div className="ml-2 mb-2 py-2 px-2 rounded-xl bg-secondary mt-2 text-white text-xl">
              <CiCirclePlus
                className={`h-10 w-10 inline-block ${!open && "pr-2"}`}
              />
              <span
                className={`ml-1 text-2xl duration-300 ${!open && "hidden"} ${
                  open && "duration-300"
                }`}
              >
                New Chat
              </span>
            </div>
          </li>
        </ul>
        <div className=" ml-2 mb-2 px-4 py-2 rounded-xl bg-secondary mt-48 text-white text-xl">
          <CiSettings className={`h-10 w-10 inline-block ${!open && "pr-2"}`} />
          <span className={`ml-1 text-2xl duration-300 ${!open && "hidden"} `}>
            Settings
          </span>
        </div>
        <div className=" ml-2  px-4 py-2 rounded-xl bg-secondary  text-white text-xl">
          <BsPersonFillCheck
            className={`h-10 w-10 inline-block ${!open && "pr-2"}`}
          />
          <span
            className={`ml-1 text-2xl duration-300 ${!open && "hidden"} ${
              open && "duration-300"
            }`}
          >
            Settings
          </span>
        </div>
      </div>
    </>
  );
};

export default SidebarTail;
