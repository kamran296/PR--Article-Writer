import React, { useState } from "react";
import "./Form.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import gptImgLogo from "./assets/chatgptLogo.svg";
import download from "./assets/download.png";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SidebarTail from "../../components/SidebarTail";
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";

const LorForm = () => {
  const [formData, setFormData] = useState({
    RecipientName: "",
    RecipientUniversity: "",
    RecommenderName: "",
    RecommenderOrganization: "",
    Domain: "",
    DurationOfRelationship: "",
    Awards: "",
    WorkPublished: "",
    SignificantWork: "",
    skills: "",
    CriticalRole: "",
    RecommenderInformation: "",
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
        "https://www.internal.cachelabs.io/api/v1/lor/add-data",
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
  const [generatedArticle, setGeneratedArticle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Generating article");
    try {
      const response = await fetch(
        // "https://www.internal.cachelabs.io/api/v1/ArticelWriter/articleForm",
        "http://localhost:5000/api/v1/lor/lor-form",
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

      setGeneratedArticle(generatedArticleText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                  className="inp1 text-black shadow-md  bg-[#FFFFFF]"
                  placeholder="Recipient's Name"
                  type="text"
                  name="RecipientName"
                  value={formData.RecipientName}
                  onChange={handleChange}
                />
              </label>

              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Recipient's Organization/University"
                  type="text"
                  name="RecipientUniversity"
                  value={formData.RecipientUniversity}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Recommender's Name"
                  type="text"
                  name="RecommenderName"
                  value={formData.RecommenderName}
                  onChange={handleChange}
                />
              </label>

              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Recommender's Organization/Institution"
                  type="text"
                  name="RecommenderOrganization"
                  value={formData.RecommenderOrganization}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Domain and niche of work"
                  type="text"
                  name="Domain"
                  value={formData.Domain}
                  onChange={handleChange}
                />
              </label>

              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Duration of Relationship with recommender"
                  type="text"
                  name="DurationOfRelationship"
                  value={formData.DurationOfRelationship}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Awards and Recognitions"
                  type="text"
                  name="Awards"
                  value={formData.Awards}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Work Published in media, journals"
                  type="text"
                  name="WorkPublished"
                  value={formData.WorkPublished}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Significant and impactful work"
                  type="text"
                  name="SignificantWork"
                  value={formData.SignificantWork}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Specialized skills"
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Critical role"
                  type="text"
                  name="CriticalRole"
                  value={formData.CriticalRole}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 text-black bg-[#FFFFFF]  shadow-md "
                  placeholder="Recommender's contact information"
                  type="text"
                  name="RecommenderInformation"
                  value={formData.RecommenderInformation}
                  onChange={handleChange}
                />
              </label>
            </div>

            <button
              className="midBtn bg-gradient-to-r from-[#AA22FF] via-[#D989FF] to-[#51FFE0] mt-[3rem]"
              type="submit"
            >
              Start Working with AI
            </button>
          </form>

          {generatedArticle && (
            <div className="chat bot bg-white max-w-[85rem] shadow-md ">
              {/* <h2>Generated Article:</h2> */}
              <div className="flex">
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

export default LorForm;
