import React, { useState } from "react";
import "./biowriter.css";
import download from "./assets/download.png";
import SideBar from "../../components/SideBar";
import SidebarTail from "../../components/SidebarTail";
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("Generating article");
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
      console.log(generatedArticle, 123);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // State for generated article
  const [generatedArticle, setGeneratedArticle] = useState("");

  return (
    <>
      <SidebarTail />
      <div className="App">
        <div className="main ml-[24rem]">
          <div className="text-black text-4xl font-poppins pb-[4rem]">
            <p>Fill the areas to generate</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Name"
                  type="text"
                  name="bioName"
                  value={formData.bioName}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
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
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="What skills, value do you bring to the table:"
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
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
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md"
                  placeholder="A Highlight from your career:"
                  type="text"
                  name="careerHighlight"
                  value={formData.careerHighlight}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
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
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Proficiency:"
                  type="text"
                  name="proficiency"
                  value={formData.proficiency}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
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
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Judging/Reviewing Opportunities Served:"
                  type="text"
                  name="judgingOpportunity"
                  value={formData.judgingOpportunity}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
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
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Vision:"
                  type="text"
                  name="vision"
                  value={formData.vision}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
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

          {generatedArticle && (
            <div className="chat bot bg-white max-w-[85rem] shadow-md">
              <div className="flex">
                {/* <h2>Generated Article:</h2> */}
                <img
                  src={download}
                  alt=""
                  className="chatImg h-[3.3rem] w-[3.5rem]"
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
          )}
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
