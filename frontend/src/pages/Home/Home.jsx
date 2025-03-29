import React, { useEffect, useState } from "react";
import "./Home.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import download from "./assets/download.png";
import { Link, useNavigate } from "react-router-dom";
import SidebarTail from "../../components/SidebarTail";
import Navbar from "../../components/Navbar";
import { BsSend } from "react-icons/bs";
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";
import SidebarPRD from "../../components/SidebarNiche";

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

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [generatedArticle, setGeneratedArticle] = useState("");
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Updated feedback state to include text fields
  const [feedback, setFeedback] = useState({
    contentQualityFeedback: "",
    grammarIssuesFeedback: "",
    creativityFeedback: "",
    relevanceFeedback: "",
    additionalComments: "",
  });
  const [loading, setLoading] = useState(false);

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

  // Updated handleModalSubmit to work with the new feedback structure
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const sanitizedFeedback = {
      contentQualityFeedback: sanitizeInput(feedback.contentQualityFeedback),
      grammarIssuesFeedback: sanitizeInput(feedback.grammarIssuesFeedback),
      creativityFeedback: sanitizeInput(feedback.creativityFeedback),
      relevanceFeedback: sanitizeInput(feedback.relevanceFeedback),
      additionalComments: sanitizeInput(feedback.additionalComments),
    };

    try {
      const response = await fetch(
        "https://www.internal.cachelabs.io/api/v1/ArticleWriter/add-article",
        //"http://localhost:5000/api/v1/ArticleWriter/add-article",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: formData.prompt,
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
      const data = await response.json();
      console.log(data);

      setIsModalOpen(false);
      // Reset feedback state with the new structure
      setFeedback({
        contentQualityFeedback: "",
        grammarIssuesFeedback: "",
        creativityFeedback: "",
        relevanceFeedback: "",
        additionalComments: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  // Updated handleFeedbackChange to work with the new feedback structure
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") generateArticle();
  };

  const generateArticle = async () => {
    console.log("Generating Article!!");
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.internal.cachelabs.io/api/v1/ArticleWriter/articlePrompt",
        //"http://localhost:5000/api/v1/ArticleWriter/articlePrompt",
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
    } finally {
      setLoading(false);
    }
  };

  // The rest of your component remains the same
  return (
    <>
      <div className="h-screen">
        <div className="">
          <Navbar />
          <div className="mt-8">
            <SidebarTail />
          </div>
        </div>
        <div className="App w-full h-full ">
          <div className="main  mt-[14rem]">
            <div className="bg-[#FFFFFF] shadow-md w-[40%] md:w-[90rem] h-[5rem] rounded-lg inline-block">
              <input
                className="outline-none w-[84rem] h-[5rem] rounded-lg text-2xl pl-[1.5rem]"
                type="text"
                placeholder="Generate an Article"
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
                <p className="ml-4 text-2xl">Generating Your Article...</p>
              </div>
            )}

            {generatedArticle && !loading && (
              <div className="chats max-w-[90rem] ">
                <div className="chat">
                  <img className="chatImg" src={userIcon} alt="" />
                  <p className="txt">
                    This is an Example Article Generated by a LLM model
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
                      <DisplayTextWithLineBreaks text={generatedArticle} />
                    </div>
                    <div className="mt-[1rem]">
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
                {/* Content Quality Section */}
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Is the content well-structured and useful?
                  </h3>
                  <textarea
                    name="contentQualityFeedback"
                    className="w-full h-24 text-lg p-2 border rounded"
                    value={feedback.contentQualityFeedback}
                    onChange={handleFeedbackChange}
                    placeholder="Share your thoughts on the structure and usefulness of the content..."
                  />
                </div>

                {/* Grammar Issues Section */}
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Did you notice any spelling or grammatical mistakes?
                  </h3>
                  <textarea
                    name="grammarIssuesFeedback"
                    className="w-full h-24 text-lg p-2 border rounded"
                    value={feedback.grammarIssuesFeedback}
                    onChange={handleFeedbackChange}
                    placeholder="List any grammar or spelling errors you found..."
                  />
                </div>

                {/* Creativity Section */}
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Does the content feel engaging or robotic?
                  </h3>
                  <textarea
                    name="creativityFeedback"
                    className="w-full h-24 text-lg p-2 border rounded"
                    value={feedback.creativityFeedback}
                    onChange={handleFeedbackChange}
                    placeholder="Describe how engaging or original the content feels..."
                  />
                </div>

                {/* Relevance Section */}
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Is the content aligned with the topic?
                  </h3>
                  <textarea
                    name="relevanceFeedback"
                    className="w-full h-24 text-lg p-2 border rounded"
                    value={feedback.relevanceFeedback}
                    onChange={handleFeedbackChange}
                    placeholder="Explain how well the content addresses the requested topic..."
                  />
                </div>

                {/* General Comments Section */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Any other feedback or suggestions?
                  </h3>
                  <textarea
                    className="w-full h-32 text-lg p-2 border rounded"
                    name="additionalComments"
                    value={feedback.additionalComments}
                    onChange={handleFeedbackChange}
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

export default Home;