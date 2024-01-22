import React, { useState } from "react";
import "./Home.css";
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { Link } from 'react-router-dom'

const Home = () => {

  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [generatedArticle, setGeneratedArticle] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEnter = (e) =>{
      if(e.key == 'Enter') generateArticle();
  }

  const generateArticle = async () => {
    console.log("Generating Article!!");
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/ArticelWriter/articlePrompt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);

      // Access the generated article from the response
      const generatedArticleText =
        data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : "";

      setGeneratedArticle(generatedArticleText);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">Article Writer</span>
          </div>
          <Link className="link" to="/">
          <button className="midBtn" onClick={() => navigate('/')}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          </Link>
          <div className="upperSideBottom">
          <Link className="link" to="/"><button className="query"><img src={msgIcon} alt="query"/>Prompt model</button></Link>
          <Link className="link" to="/article-form/"><button className="query"><img src={msgIcon} alt="query" />Form model</button></Link>

          </div>
        </div>
        <div className="lowerside"></div>
      </div>
      <div className="main">
      {generatedArticle && (
            <div className="chats">
              <div className="chat">
                <img className="chatImg" src={userIcon} alt="" /><p className="txt">This is an Example Article Generated by a LLM model</p>
              </div>
              <div className="chat bot">
                <img className="chatImg" src={gptImgLogo} alt="" /><p className="txt">{generatedArticle}</p>
              </div>

            </div>
      )}
            <div className="chatFooter">
                <div className="inp">
                  <input className="inpt" type="text" placeholder="Generate an Article" name="prompt" onKeyDown={handleEnter} onChange={handleInputChange}/> 
                  <button className="send" onClick={generateArticle}><img src={sendBtn} alt="Send" /></button>
                </div>
            </div>
            </div>
      </div>
    </div>
  );
};

export default Home;
