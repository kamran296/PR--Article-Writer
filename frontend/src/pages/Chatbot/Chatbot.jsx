import React, { useState, useEffect } from "react";
import SidebarTail from "./../../components/SidebarTail";
import { BsSend } from "react-icons/bs";
import { BiLike, BiDislike } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchUser } from "../../redux/userSlice";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/chatbot");
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://15.206.166.198/api/v1/chatbot/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chat: input }),
        }
      );
      const data = await response.json();
      const generatedArticleText =
        data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : "";

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { question: input, answer: data },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDislikeClick = (index) => {
    setCurrentChatIndex(index);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(input, 3232);
      const response = await fetch(
        "http://15.206.166.198/api/v1/chatbot/add-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: chatHistory[currentChatIndex].question,
            answer: correctAnswer,
          }),
        }
      );
      const data = await response.json();
      console.log(data, 434);
      if (currentChatIndex !== null) {
        setChatHistory((prevChatHistory) => {
          const newChatHistory = [...prevChatHistory];
          newChatHistory[currentChatIndex].correctAnswer = correctAnswer;
          return newChatHistory;
        });
        setIsModalOpen(false);
        setCorrectAnswer("");
      }
    } catch (error) {}
  };
  const handleDownload = async (req, res) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/chatbot/downloadDatabase",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SidebarTail />
      <div className="App">
        <div className="flex justify-between">
          <div className="main mt-[10rem] mr-[4rem] ml-[24rem]">
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between"
            >
              <input
                type="text"
                name="question"
                className="inp1 text-black bg-[#FFFFFF] shadow-md"
                placeholder="Ask me anything!!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="ml-2 mb-[2rem] h-12 w-20">
                <BsSend className="text-3xl rotate-45 flex text-gray-500" />
              </button>
            </form>
            <div>
              {/* <button
                type="submit"
                onClick={handleDownload}
                className="bg-black text-white text-2xl"
              >
                Updata
              </button> */}
            </div>
          </div>

          <div className="flex flex-col chat-history mt-[10rem] h-[500px] w-[700px] overflow-y-auto bg-white max-w-[85rem] shadow-md p-4 rounded-lg border border-gray-200">
            {chatHistory.length === 0 ? (
              <p className="flex justify-center items-center w-full text-2xl font-bold text-gray-500">
                Welcome! Ask me anything.
              </p>
            ) : (
              chatHistory.map((chat, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col items-end">
                    <p>
                      <strong className="text-blue-600vtext-3xl">You:</strong>
                    </p>
                    <p className="text-yellow-600 text-3xl">{chat.question}</p>
                  </div>
                  <div className="flex flex-col items-start mt-2">
                    <p>
                      <strong className="text-green-600 text-3xl">Sai:</strong>
                    </p>
                    <p className="text-3xl">
                      {chat.correctAnswer ? chat.correctAnswer : chat.answer}
                      <span className="ml-2">
                        <BiLike className="inline-block text-green-500 cursor-pointer text-3xl" />
                        <BiDislike
                          className="inline-block text-red-500 cursor-pointer ml-2 text-3xl"
                          onClick={() => handleDislikeClick(index)}
                        />
                      </span>
                    </p>
                  </div>
                  {/* {chat.correctAnswer && (
                    <div className="flex flex-col items-start mt-2">
                      <p>
                        <strong className="text-red-600 text-xl">
                          Correct Answer:
                        </strong>
                      </p>
                      <p>{chat.correctAnswer}</p>
                    </div>
                  )} */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-md w-1/3">
            <h2 className="text-3xl font-bold mb-4">
              Provide the correct answer
            </h2>
            <form onSubmit={handleModalSubmit}>
              <textarea
                className="w-full p-2 mb-4 border rounded"
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

export default Chatbot;
