import React, { useState } from "react";
import "./loaform.css";
import download from "./assets/download.png";
import SidebarTail from "../../components/SidebarTail";
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";
import Navbar from "../../components/Navbar";
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

const LoaCritical = ({ type }) => {
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
    recipientRoleDescription: "",
    responsibilitiesUndertaken: "",
    keySkills: "",
    project: "",
    challengesFaced: "",
    outcomeAchievements: "",
    tokenOfGratitude: "",
  });

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
        // "http://localhost:5000/api/v1/loa/critical-data",
        "https://www.internal.cachelabs.io/api/v1/loa/critical-data",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: sanitizeInput(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Generating article");
    setGeneratedArticle("");
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://www.internal.cachelabs.io/api/v1/loa/loa-critical",
        // "http://localhost:5000/api/v1/loa/loa-critical",
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
      // handleEdit;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // State for generated article

  const [generatedArticle, setGeneratedArticle] = useState("");
  // edit the output
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
              <div className={`${!generatedArticle ? "row " : ""}`}>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Recipient's Name
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Recipient's Name"
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Recipient's Organization/University
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
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
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Sender's Name
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Sender's Name"
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Sender's Organization/Institution
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Sender's Organization/Institution"
                    type="text"
                    name="senderOrganization"
                    value={formData.senderOrganization}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "flex " : ""}`}>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Sender's Relationship with the Recipient
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Sender's Relationship with the Recipient"
                    type="text"
                    name="senderRelationship"
                    value={formData.senderRelationship}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Concerned Field of Work
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
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
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Niche Domain (if any)
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Niche Domain (if any)"
                    type="text"
                    name="nicheDomain"
                    value={formData.nicheDomain}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Source of Knowledge
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md "
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
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Previous Contributions
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Previous Contributions"
                    type="text"
                    name="previousContributions"
                    value={formData.previousContributions}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Reciepent Role Description
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Reciepent Role Description"
                    type="text"
                    name="recipientRoleDescription"
                    value={formData.recipientRoleDescription}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Responsibilities Undertaken
                  </p>
                  <textarea
                    className="w-[30rem]  h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Responsibilities Undertaken"
                    type="text"
                    name="responsibilitiesUndertaken"
                    value={formData.responsibilitiesUndertaken}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Reciepent Key Skills
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Reciepent Key Skills"
                    type="text"
                    name="keySkills"
                    value={formData.keySkills}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Projects
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Projects"
                    type="text"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Challenges Faced
                  </p>
                  <textarea
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Challenges Faced"
                    type="text"
                    name="challengesFaced"
                    value={formData.challengesFaced}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={`${!generatedArticle ? "row" : ""}`}>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Outcome / Achievements
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md "
                    placeholder="Outcome /Achievements"
                    type="text"
                    name="outcomeAchievements"
                    value={formData.outcomeAchievements}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className="ml-4 mb-3  text-[1.25rem] font-semibold">
                    Token Of Gratitude
                  </p>
                  <input
                    className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 mb-4  outline-none text-black bg-[#FFFFFF] shadow-md"
                    placeholder="Token Of Gratitude"
                    type="text"
                    name="tokenOfGratitude"
                    value={formData.tokenOfGratitude}
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

export default LoaCritical;
