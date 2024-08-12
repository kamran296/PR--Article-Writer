import React, { useState } from "react";
import "./biowriter.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import download from "./assets/download.png";
import { Link } from "react-router-dom";

import SidebarTail from "../../components/SidebarTail";
import { BsSend } from "react-icons/bs";
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";

const LoaPrompt = () => {
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [generatedArticle, setGeneratedArticle] = useState("");
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleDislikeClick = () => {
    setIsModalOpen(true);
  };

  const handlelikeClick = () => {
    setLiked(!liked);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        // "http://localhost:5000/api/v1/bio/add-data",
        "https://www.internal.cachelabs.io/api/v1/bio/add-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: formData.prompt,
            answer: correctAnswer,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      setIsModalOpen(false);
      setCorrectAnswer("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") generateArticle();
  };

  const generateArticle = async () => {
    console.log("Generating Article!!");
    try {
      const response = await fetch(
        // "http://localhost:5000/api/v1/bio/bio-writer-prompt",
        "https://www.internal.cachelabs.io/api/v1/bio/bio-writer-prompt",
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
    <>
      <SidebarTail />
      <div>
        <div className="App">
          <div className="main ml-[25rem] mt-[10rem]">
            <div className="">
              <div className="inp shadow-md  bg-[#FFFFFF] w-[90rem] h-[5rem] rounded-lg">
                <input
                  className="  bg-[#FFFFFF] text-black  outline-none w-[84rem] h-[5rem] rounded-lg text-2xl pl-[1.5rem]"
                  type="text"
                  placeholder="Generate a BIO"
                  name="prompt"
                  onKeyDown={handleEnter}
                  onChange={handleInputChange}
                />
                <button className="send" onClick={generateArticle}>
                  <BsSend className=" text-secondary w-[2rem] h-[2rem] rotate-45 text-3xl inline-block" />
                </button>
              </div>
            </div>

            {generatedArticle && (
              <div className="chats max-w-[90rem]">
                <div className="chat">
                  <img className="chatImg" src={userIcon} alt="" />
                  <p className="txt">
                    This is an Example Article Generated by a LLM model
                  </p>
                </div>
                <div className="chat bot shadow-md bg-white">
                  <div className="flex">
                    <img
                      className="chatImg h-[3.3rem] w-[3.5rem]"
                      src={download}
                      alt=""
                    />
                    <p className="txt">{generatedArticle}</p>
                  </div>
                  <div className="mt-[1rem]">
                    <span className="flex ml-[5rem]">
                      <div onClick={handlelikeClick}>
                        {liked ? (
                          <BiSolidLike className="text-green-500 inline-block h-[2.5rem] w-[2.5rem] cursor-pointer text-3xl" />
                        ) : (
                          <BiLike className="text-green-500 inline-block h-[2.5rem] w-[2.5rem] cursor-pointer text-3xl" />
                        )}
                      </div>
                      <BiDislike
                        className="inline-block h-[2.5rem] w-[2.5rem] text-red-500 cursor-pointer ml-2 text-3xl"
                        onClick={() => handleDislikeClick()}
                      />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-md w-[72rem]">
            <h2 className="text-3xl font-bold mb-4">
              Provide the correct answer
            </h2>
            <form onSubmit={handleModalSubmit}>
              <textarea
                className="w-full h-[35rem] text-xl p-2 mb-4 border rounded"
                rows="4"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter the correct answer here"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoaPrompt;
