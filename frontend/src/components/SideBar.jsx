import React from "react";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import download from "./assets/download.png";
import { Link } from "react-router-dom";
import "./sidebar.css";
const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="upperSide">
        <div className="upperSideTop">
          <img src={download} alt="Logo" className="logo" />
          <span className="brand">Article Writer</span>
        </div>
        <Link className="link" to="/">
          <button className="midBtn" onClick={() => navigate("/")}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
        </Link>
        <div className="upperSideBottom">
          <Link className="link" to="/">
            <button className="query">
              <img src={msgIcon} alt="query" />
              Prompt model
            </button>
          </Link>
          <Link className="link" to="/article-form/">
            <button className="query">
              <img src={msgIcon} alt="query" />
              Form model
            </button>
          </Link>
          <Link className="link" to="/loa-prompt/">
            <button className="query">
              <img src={msgIcon} alt="query" />
              LOA Prompt
            </button>
          </Link>
          <Link className="link" to="/loa-form/">
            <button className="query">
              <img src={msgIcon} alt="query" />
              LOA form
            </button>
          </Link>
          <Link className="link" to="/bio-writer-prompt/">
            <button className="query">
              <img src={msgIcon} alt="query" />
              Bio Writer Prompt
            </button>
          </Link>
          <Link className="link" to="/bio-writer/">
            <button className="query">
              <img src={msgIcon} alt="query" />
              Bio Writer Form
            </button>
          </Link>
        </div>
      </div>
      <div className="lowerside"></div>
    </div>
  );
};

export default SideBar;
