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
import Navbar from "../../components/Navbar";
import SidebarTail from "../../components/SidebarTail";
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
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [generatedArticle, setGeneratedArticle] = useState("");
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Added missing feedback state
  const [feedback, setFeedback] = useState({
    contentQualityFeedback: "",
    grammarIssuesFeedback: "",
    creativityFeedback: "",
    relevanceFeedback: "",
    additionalComments: "",
  });

  const handleDislikeClick = () => {
    setIsModalOpen(true);
  };

  const handlelikeClick = () => {
    setLiked(!liked);
  };

  const sanitizeInput = (input) => {
    if (!input) return "";
    return input.replace(/[<>{}()[\]'";:\/\\|^&$]/g, "");
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const sanitizedAnswer = sanitizeInput(correctAnswer);
    const sanitizedFeedback = {
      contentQualityFeedback: sanitizeInput(feedback.contentQualityFeedback),
      grammarIssuesFeedback: sanitizeInput(feedback.grammarIssuesFeedback),
      creativityFeedback: sanitizeInput(feedback.creativityFeedback),
      relevanceFeedback: sanitizeInput(feedback.relevanceFeedback),
      additionalComments: sanitizeInput(feedback.additionalComments),
    };

    try {
      const response = await fetch(
        //"http://localhost:5000/api/v1/bio/add-data",
        "https://www.internal.cachelabs.io/api/v1/bio/add-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: formData.prompt,
            answer: sanitizedAnswer,
            feedback: {
              contentQuality: sanitizedFeedback.contentQualityFeedback,
              grammarIssues: sanitizedFeedback.grammarIssuesFeedback,
              creativity: sanitizedFeedback.creativityFeedback,
              relevance: sanitizedFeedback.relevanceFeedback,
              additionalComments: sanitizedFeedback.additionalComments,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setIsModalOpen(false);
      setCorrectAnswer("");
      setFeedback({
        contentQualityFeedback: "",
        grammarIssuesFeedback: "",
        creativityFeedback: "",
        relevanceFeedback: "",
        additionalComments: "",
      });

      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error submitting feedback: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") generateArticle();
  };

  const generateArticle = async (e) => {
    if (e) e.preventDefault();
    console.log("Generating Article!!");
    setLoading(true);
    const sanitizedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = sanitizeInput(formData[key]);
      return acc;
    }, {});
    
    try {
      const response = await fetch(
        "https://www.internal.cachelabs.io/api/v1/bio/bio-writer-prompt",
        //"http://localhost:5000/api/v1/bio/bio-writer-prompt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedFormData),
        }
      );

      const data = await response.json();
      const generatedArticleText =
        data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : "";

      setGeneratedArticle(generatedArticleText);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="">
          <Navbar />
          <div className="mt-8">
            <SidebarTail />
          </div>
        </div>
        <div className="App w-full h-full">
          <div className="main ml-[25rem] mt-[10rem]">
            <div className="shadow-md bg-[#FFFFFF] w-[90rem] h-[5rem] rounded-lg">
              <input
                className="text-black outline-none w-[84rem] h-[5rem] rounded-lg text-2xl pl-[1.5rem]"
                type="text"
                placeholder="Generate a BIO"
                name="prompt"
                onKeyDown={handleEnter}
                onChange={handleInputChange}
              />
              <button
                className={`text-xl text-secondary w-[6rem] h-[5rem] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={generateArticle}
                disabled={loading}
              >
                <BsSend className="text-secondary w-[2rem] h-[2rem] rotate-45 text-3xl inline-block" />
              </button>
            </div>

            {loading && (
              <div className="flex justify-center items-center mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-2xl">Generating Your BIO...</p>
              </div>
            )}

            {generatedArticle && !loading && (
              <div className="chats max-w-[90rem]">
                <div className="chat">
                  <img className="chatImg" src={userIcon} alt="" />
                  <p className="txt">
                    This is an Example BIO Generated by a LLM model
                  </p>
                </div>
                <div className="chat bot shadow-md bg-white">
                  <div className="flex">
                    <img
                      className="chatImg h-[3.3rem] w-[3.5rem]"
                      src={download}
                      alt=""
                    />
                    <div className="flex-1">
                      <DisplayTextWithLineBreaks text={generatedArticle} />
                      <span className="flex ml-[5rem] gap-4">
  <button
    onClick={() => {
      handlelikeClick();
      // Clear dislike selection when like is clicked
      if (!liked) setIsModalOpen(false);
    }}
    disabled={isModalOpen && !liked}
    className={`
      relative px-6 py-2 rounded-full font-medium
      border-2 ${isModalOpen && !liked ? 'border-gray-300' : 'border-green-500'}
      transition-all duration-300 ease-in-out
      overflow-hidden
      before:content-[''] before:absolute before:inset-0 
      ${isModalOpen && !liked ? 'before:bg-gray-100' : 'before:bg-green-500'}
      before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-in-out
      ${liked ? 'before:scale-x-100 text-white' : `text-${isModalOpen && !liked ? 'gray-400' : 'green-500'}`}
      ${!(isModalOpen && !liked) ? 'hover:before:scale-x-100 hover:text-white' : ''}
      ${isModalOpen && !liked ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    <span className="relative z-10">Do you like this article</span>
  </button>
  <button
    onClick={() => {
      handleDislikeClick();
      // Clear like selection when dislike is clicked
      if (!isModalOpen) setLiked(false);
    }}
    disabled={liked && !isModalOpen}
    className={`
      relative px-6 py-2 rounded-full font-medium
      border-2 ${liked && !isModalOpen ? 'border-gray-300' : 'border-red-500'}
      transition-all duration-300 ease-in-out
      overflow-hidden
      before:content-[''] before:absolute before:inset-0 
      ${liked && !isModalOpen ? 'before:bg-gray-100' : 'before:bg-red-500'}
      before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-in-out
      ${isModalOpen ? 'before:scale-x-100 text-white' : `text-${liked && !isModalOpen ? 'gray-400' : 'red-500'}`}
      ${!(liked && !isModalOpen) ? 'hover:before:scale-x-100 hover:text-white' : ''}
      ${liked && !isModalOpen ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    <span className="relative z-10">Suggest some changes</span>
  </button>
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
          <div className="bg-white p-8 rounded-xl shadow-md w-[72rem] max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4">Provide Feedback</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Is the content well-structured and useful?
                  </h3>
                  <textarea
                    name="contentQualityFeedback"
                    className="w-full h-24 text-lg p-2 border rounded"
                    value={feedback.contentQualityFeedback}
                    onChange={(e) => setFeedback({...feedback, contentQualityFeedback: e.target.value})}
                    placeholder="Share your thoughts on the structure and usefulness of the content..."
                  />
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Did you notice any spelling or grammatical mistakes?
                  </h3>
                  <textarea
                    name="grammarIssuesFeedback"
                    className="w-full h-24 text-lg p-2 border rounded"
                    value={feedback.grammarIssuesFeedback}
                    onChange={(e) => setFeedback({...feedback, grammarIssuesFeedback: e.target.value})}
                    placeholder="List any grammar or spelling errors you found..."
                  />
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Does the content feel engaging or robotic?
                  </h3>
                  <textarea
                    name="creativityFeedback"
                    className="w-full h-24 text-lg p-2 border rounded"
                    value={feedback.creativityFeedback}
                    onChange={(e) => setFeedback({...feedback, creativityFeedback: e.target.value})}
                    placeholder="Describe how engaging or original the content feels..."
                  />
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Is the content aligned with the topic?
                  </h3>
                  <textarea
                    name="relevanceFeedback"
                    className="w-full h-24 text-lg p-2 border rounded"
                    value={feedback.relevanceFeedback}
                    onChange={(e) => setFeedback({...feedback, relevanceFeedback: e.target.value})}
                    placeholder="Explain how well the content addresses the requested topic..."
                  />
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Provide the correct answer
                  </h3>
                  <textarea
                    className="w-full h-32 text-lg p-2 border rounded"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    placeholder="Enter the correct answer here..."
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Any other feedback or suggestions?
                  </h3>
                  <textarea
                    className="w-full h-32 text-lg p-2 border rounded"
                    name="additionalComments"
                    value={feedback.additionalComments}
                    onChange={(e) => setFeedback({...feedback, additionalComments: e.target.value})}
                    placeholder="Share any other thoughts or suggestions for improvement..."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoaPrompt;