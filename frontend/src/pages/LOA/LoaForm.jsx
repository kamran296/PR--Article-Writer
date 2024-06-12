import React, { useState } from "react";
import "./loaform.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import gptImgLogo from "./assets/chatgptLogo.svg";
import download from "./assets/download.png";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import LoaCritical from "./LoaCritical";
import LoaResearch from "./LoaResearch";
import LoaOriginal from "./LoaOriginal";
import SidebarTail from "../../components/SidebarTail";

const LoaForm = () => {
  const [activeTab, setActiveTab] = useState("1");

  const handleChangeTabs = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <SidebarTail />
      <div className="App">
        <div className="main ml-[25rem]">
          <div className="border-b-2 border-gray-300 bg-white rounded-lg">
            <div className="flex justify-between">
              <button
                className={`px-6 py-4 focus:outline-none ${
                  activeTab === "1"
                    ? "bg-secondary text-white"
                    : "text-gray-600"
                }`}
                onClick={() => handleChangeTabs("1")}
              >
                Critical Role
              </button>
              <button
                className={`px-6 py-4 focus:outline-none ${
                  activeTab === "2"
                    ? "bg-secondary text-white"
                    : "text-gray-600"
                }`}
                onClick={() => handleChangeTabs("2")}
              >
                Research paper
              </button>
              <button
                className={`px-6 py-4 focus:outline-none ${
                  activeTab === "3"
                    ? "bg-secondary text-white"
                    : "text-gray-600"
                }`}
                onClick={() => handleChangeTabs("3")}
              >
                Original Contribution
              </button>
            </div>
          </div>
          {activeTab === "1" && <LoaCritical type={"Critical Role"} />}
          {activeTab === "2" && (
            <LoaResearch type={"Research Paper publication"} />
          )}
          {activeTab === "3" && <LoaOriginal type={"Original Contribution"} />}
        </div>
      </div>
    </>
  );
};

export default LoaForm;
