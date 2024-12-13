import React, { useState } from "react";
import "./biowriter.css";
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

const BioWriter = () => {
  const [formData, setFormData] = useState({
    bioName: "",
    professionalExperience: "",
    skills: "",
    background: "",
    careerHighlight: "",
    commitments: "",
    proficiency: "",
    academicExcellence: "",
    judgingOpportunity: "",
    recognitionOrAwards: "",
    pressOrMedia: "",
    vision: "",
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
    const sanitizedCorrectAnswer = sanitizeInput(correctAnswer);
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
            answer: sanitizedCorrectAnswer,
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

    // // Sanitize each input field in formData
    // const sanitizedFormData = Object.keys(formData).reduce((acc, key) => {
    //   acc[key] = sanitizeInput(formData[key]);
    //   return acc;
    // }, {});
    // console.log(sanitizedFormData);
    console.log("Generating article");
    setGeneratedArticle(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        // "http://localhost:5000/api/v1/bio/bio-writer",
        "https://www.internal.cachelabs.io/api/v1/bio/bio-writer",
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

      // Set the generated article text to the state
      console.log(generatedArticleText, 321);
      setGeneratedArticle(generatedArticleText);
      setIsLoading(false);
      console.log(generatedArticle, 123);
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
      <Navbar />
      <div className="main h-[90vh] flex flex-col items-start">
        <div className="container flex flex-row items-start justify-start h-[90vh] w-full">
          <div className="left  -ml-40 -mt-16 w-[15%] h-full">
            <SidebarTail />
          </div>
          <div className="right flex-grow flex flex-col md:flex-row md:items-start md:justify-between ml-10 mt-12 w-full h-full ">
            <div className="left mt-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Name
                    </p>

                    <input
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Name"
                      type="text"
                      name="bioName"
                      value={formData.bioName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Professional Experience
                    </p>

                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Professional Experience"
                      type="text"
                      name="professionalExperience"
                      value={formData.professionalExperience}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="row">
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Skills
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Java, Python, React, etc.."
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Background
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Something about your background:"
                      type="text"
                      name="background"
                      value={formData.background}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="row">
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Career Highlight
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4"
                      placeholder="A Highlight from your career:"
                      type="text"
                      name="careerHighlight"
                      value={formData.careerHighlight}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Commitments
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="What you commit to as a professional in your respective field of
                  work:"
                      type="text"
                      name="commitments"
                      value={formData.commitments}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="row">
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Proficiency
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Proficiency:"
                      type="text"
                      name="proficiency"
                      value={formData.proficiency}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Academic Excellence
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Academic Excellence:"
                      type="text"
                      name="academicExcellence"
                      value={formData.academicExcellence}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="row">
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Judging Opportunity
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Judging/Reviewing Opportunities Served:"
                      type="text"
                      name="judgingOpportunity"
                      value={formData.judgingOpportunity}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Press/Media Coverage
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Press/Media Coverage"
                      type="text"
                      name="pressOrMedia"
                      value={formData.pressOrMedia}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="row">
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Vision
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Vision:"
                      type="text"
                      name="vision"
                      value={formData.vision}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <p className="ml-4 text-[1.25rem] font-semibold mb-2 mt-4">
                      Recognition/Awards
                    </p>
                    <textarea
                      className="w-[30rem] h-[4rem] rounded-lg p-4 text-2xl mx-3 outline-none text-black bg-[#FFFFFF] shadow-md mb-4 "
                      placeholder="Awards & Recognitions Conferred"
                      type="text"
                      name="recognitionOrAwards"
                      value={formData.recognitionOrAwards}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <button
                  className="midBtn bg-gradient-to-r from-[#AA22FF] via-[#D989FF] to-[#51FFE0] mt-[3rem]"
                  type="Submit"
                >
                  Generate BIO
                </button>
              </form>
            </div>
            <div className="right flex w-1/2 h-full">
              {!generatedArticle && (
                <div className="default bg-white max-w-[90rem] w-[73rem] h-full shadow-md shadow-neutral-400">
                  <div className="m-4 flex text-2xl ">
                    <img
                      src={download}
                      alt=""
                      className="chatImg h-[3.3rem] w-[3.5rem] "
                    />
                    <h1 className="mt-3 text-bold">Generated BIO</h1>
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
                <div className="chat  bot mt-1 flex flex-col justify-start items-start bg-white max-w-[90rem] w-[73rem] h-full shadow-md ">
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

export default BioWriter;
