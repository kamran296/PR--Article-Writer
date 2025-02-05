import React, { useEffect, useState } from "react";
import "./home.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import download from "./assets/download.png";
import { Link, useNavigate } from "react-router-dom";
// import SideBar from "../../components/SideBar";
import SidebarTail from "../../components/SidebarTail";
import Navbar from "../../components/Navbar";
import { BsSend } from "react-icons/bs";
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";

function DisplayTextWithLineBreaks({ text }) {
  return (
    <div>
      {text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

const LoaPrompt = () => {
  const navigate = useNavigate();

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

  const sanitizeInput = (input) => {
    if (!input) return ""; // Handle empty input safely
    return input.replace(/[<>{}()[\]'";:\/\\|^&$]/g, ""); // Removes unwanted characters
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const sanitizedAnswer = sanitizeInput(correctAnswer);
    try {
      const response = await fetch(
        "https://www.internal.cachelabs.io/api/v1/lor/add-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: formData.prompt,
            answer: sanitizedAnswer,
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
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") generateArticle();
  };

  const generateArticle = async () => {
    console.log("Generating Article!!");
    try {
      const response = await fetch(
        "https://www.internal.cachelabs.io/api/v1/lor/lor-prompt",
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
      <div>
        <div className="App">
          <div className="">
            <Navbar />
            <div className="mt-8">
              <SidebarTail />
            </div>
          </div>
          <div className="main ml-[25rem] mt-36">
            <div className="bg-[#FFFFFF] shadow-md  w-[90rem] h-[5rem] rounded-lg inline-block">
              <input
                className="outline-none w-[84rem] h-[5rem] rounded-lg text-2xl pl-[1.5rem]"
                type="text"
                placeholder="Generate an LOR"
                name="prompt"
                onKeyDown={handleEnter}
                onChange={handleInputChange}
              />
              <button
                className="text-xl text-secondary w-[6rem] h-[5rem]"
                onClick={generateArticle}
              >
                <BsSend className=" text-secondary w-[2rem] h-[2rem] rotate-45 text-3xl inline-block" />
              </button>
            </div>

            {generatedArticle && (
              <div className="chats max-w-[90rem] ">
                <div className="chat">
                  <img className="chatImg" src={userIcon} alt="" />
                  <p className="txt">
                    This is the LOR generated by a LLM model
                  </p>
                </div>
                <div className="chat bot bg-white shadow-md">
                  <div className="">
                    <div className="flex">
                      <img
                        className="chatImg h-[3.3rem] w-[3.5rem]"
                        src={download}
                        alt=""
                      />
                      {/* <p className="txt font-poppins">{generatedArticle}</p> */}
                      <DisplayTextWithLineBreaks text={generatedArticle} />;
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
