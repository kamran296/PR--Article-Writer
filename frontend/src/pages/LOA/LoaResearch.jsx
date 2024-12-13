import React, { useState } from "react";
import "./loaform.css";
import download from "./assets/download.png";
import SidebarTail from "../../components/SidebarTail";
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";
import { LuRefreshCw } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import Animation from "../../assets/Animation.gif";

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
const LoaResearch = ({ type }) => {
  const [formData, setFormData] = useState({
    typeOfLOA: type,
    recipientName: "",
    recipientOrganization: "",
    senderName: "",
    senderOrganization: "",
    senderRelationship: "",
    concernedFieldOfWork: "",
    nicheDomain: "",
    sourceOfKnowledge: "",
    previousContributions: "",
    recognitionOrAwards: "",
    titleOfPaper: "",
    AspectOfPaper: "",
    noveltyOfWork: "",
    significanceForFutureWork: "",
    takeawayFromPaper: "",
    detailedDescription: "",
    Publication: "",
    letterContentCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: sanitizeInput(value),
    });
  };

  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        // "http://localhost:5000/api/v1/loa/research-data",
        "https://www.internal.cachelabs.io/api/v1/loa/research-data",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Generating article");
    setGeneratedArticle("");
    setIsLoading(true);
    try {
      const response = await fetch(
        // "http://localhost:5000/api/v1/loa/loa-research",
        "https://www.internal.cachelabs.io/api/v1/loa/loa-research",
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
      const generatedArticleText =
        data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : "";

      // Handle setting generated article state
      setGeneratedArticle(generatedArticleText);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // State for generated article
  const [generatedArticle, setGeneratedArticle] = useState("");
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedArticle)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      <div className="main w-[127rem]  ml-20 ">
        <div className="container w-[110%] flex flex-row items-start justify-between ">
          <div className="left h-[700px] w-1/2 ">
            <form onSubmit={handleSubmit}>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Recipient's Name
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Recipient's Name"
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Recipient's Organization/University
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Recipient's Organization/University"
                    type="text"
                    name="recipientOrganization"
                    value={formData.recipientOrganization}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Sender's Name
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Sender's Name"
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Sender's Organization/Institution
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Sender's Organization/Institution"
                    type="text"
                    name="senderOrganization"
                    value={formData.senderOrganization}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Sender's Relationship with the Recipient
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Sender's Relationship with the Recipient"
                    type="text"
                    name="senderRelationship"
                    value={formData.senderRelationship}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Concerned Field of Work
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Concerned Field of Work"
                    type="text"
                    name="concernedFieldOfWork"
                    value={formData.concernedFieldOfWork}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Niche Domain (if any)
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Niche Domain (if any)"
                    type="text"
                    name="nicheDomain"
                    value={formData.nicheDomain}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Source of Knowledge
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Source of Knowledge"
                    type="text"
                    name="sourceOfKnowledge"
                    value={formData.sourceOfKnowledge}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Previous Contributions
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Previous Contributions"
                    type="text"
                    name="previousContributions"
                    value={formData.previousContributions}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Title of paper
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Title of paper"
                    type="text"
                    name="titleOfPaper"
                    value={formData.titleOfPaper}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Aspect Of Paper
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Aspect Of Paper"
                    type="text"
                    name="AspectOfPaper"
                    value={formData.AspectOfPaper}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Novelty Of Work
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Novelty Of Work"
                    type="text"
                    name="noveltyOfWork"
                    value={formData.noveltyOfWork}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Significance For Future Works
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Significance For Future Works"
                    type="text"
                    name="significanceForFutureWork"
                    value={formData.significanceForFutureWork}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Takeaway From Paper
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Takeaway From Paper"
                    type="text"
                    name="takeawayFromPaper"
                    value={formData.takeawayFromPaper}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Detailed Description
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Detailed Description"
                    type="text"
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3 text-[1.25rem] font-semibold">
                    Publication
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4 outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Publication"
                    type="text"
                    name="Publication"
                    value={formData.Publication}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button
                className="midBtn bg-gradient-to-r from-[#AA22FF] via-[#D989FF] to-[#51FFE0] mt-[3rem]"
                type="Submit"
              >
                Generate LOA
              </button>
            </form>
          </div>
          <div className="right flex w-1/2 h-[70rem]  ml-16">
            {!generatedArticle && (
              <div className="default bg-white max-w-[90rem] w-[73rem] h-[70rem] shadow-md ">
                <div className="m-4 flex text-2xl ">
                  <img
                    src={download}
                    alt=""
                    className="chatImg h-[3.3rem] w-[3.5rem] "
                  />
                  <h1 className="mt-3 text-bold">Generate LOA</h1>
                </div>
                <div className="flex items-center justify-center h-full">
                  {isLoading && (
                    <div className="flex items-center justify-center ">
                      <img
                        src={Animation}
                        alt="Loading"
                        className="w-32 h-32 "
                      />
                      <span className="ml-2 text-2xl">Generating...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {generatedArticle && (
              <div className="chat  bot -mt-2 flex flex-col justify-start items-start bg-white max-w-[90rem] w-[73rem] h-[70rem] shadow-md ">
                <div className="flex   pb-[1rem] pr-[3rem] h-[600px]  overflow-y-auto ">
                  <img
                    src={download}
                    alt=""
                    className="chatImg h-[3.3rem] w-[3.5rem]"
                  />
                  {/* <h2>Generated LOA:</h2> */}

                  {/* <div className="txt">{generatedArticle}</div> */}
                  <DisplayTextWithLineBreaks
                    text={generatedArticle}
                    className="text-center"
                  />
                </div>
                <div className="mt-[1.5rem] flex ">
                  <span className="flex ml-[5rem]">
                    <div onClick={handlelikeClick}>
                      {liked ? (
                        <BiSolidLike className="text-gray-800 inline-block h-[2.5rem] w-[2.5rem] cursor-pointer text-3xl" />
                      ) : (
                        <BiLike className="text-gray-800 inline-block h-[2.5rem] w-[2.5rem] cursor-pointer text-3xl" />
                      )}
                    </div>
                    <BiDislike
                      className="inline-block h-[2.5rem] w-[2.5rem] text-gray-800 cursor-pointer ml-3 text-3xl"
                      onClick={() => handleDislikeClick()}
                    />
                    <LuRefreshCw
                      className="inline-block h-[2.25rem] w-[2.25rem] text-gray-800 cursor-pointer ml-3 text-2xl "
                      onClick={handleSubmit}
                    />

                    <div>
                      {copied ? (
                        <FaCopy className="text-gray-800 ml-3 inline-block h-[2.25rem] w-[2.25rem] cursor-pointer text-3xl" />
                      ) : (
                        <FaRegCopy
                          className=" ml-3 inline-block h-[2.25rem] w-[2.25rem] text-gray-800 cursor-pointer text-2xl "
                          onClick={copyToClipboard}
                        />
                      )}
                    </div>
                  </span>
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
                s="4"
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

export default LoaResearch;
