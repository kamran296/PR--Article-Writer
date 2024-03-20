import React, { useState } from "react";
import "./Form.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import gptImgLogo from "./assets/chatgptLogo.svg";
import download from "./assets/download.png";
import { Link } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    highestDegree: "",
    specialization: "",
    university: "",
    jobTitle: "",
    currentEmployer: "",
    experience: "",
    industry: "",
    achievements: "",
    impact: "",
    projects: "",
    quantifiedWorks: "",
    challengesOvercome: "",
    publications: "",
    industryInsight: "",
  });

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
        "http://15.206.166.198/api/v1/ArticelWriter/articleForm",
        // "http://localhost:5000/api/v1/ArticelWriter/articleForm",
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
      <div className="App">
        <div className="sideBar">
          <div className="upperSide">
            <div className="upperSideTop">
              <img src={download} alt="Logo" className="logo" />
              <span className="brand">Article Writer</span>
            </div>
            <Link className="link" to="/">
              <button className="midBtn" onClick={() => navigate("/")}>
                <img src={addBtn} alt="new chat" className="addBtn" />
                New Chat
              </button>
            </Link>
            <div className="upperSideBottom">
              <Link className="link" to="/">
                <button className="query">
                  <img src={msgIcon} alt="query" />
                  Prompt model
                </button>
              </Link>
              <Link className="link" to="/article-form/">
                <button className="query">
                  <img src={msgIcon} alt="query" />
                  Form model
                </button>
              </Link>
              <Link className="link" to="/loa-prompt/">
                <button className="query">
                  <img src={msgIcon} alt="query" />
                  LOA Prompt
                </button>
              </Link>
              <Link className="link" to="/loa-form/">
                <button className="query">
                  <img src={msgIcon} alt="query" />
                  LOA Form
                </button>
              </Link>
            </div>
          </div>
          <div className="lowerside"></div>
        </div>
        <div className="main">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label>
                Name:
                <input
                  className="inp1"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Expertise:
                <input
                  className="inp1"
                  type="text"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Highest Degree:
                <input
                  className="inp1"
                  type="text"
                  name="highestDegree"
                  value={formData.highestDegree}
                  onChange={handleChange}
                />
              </label>

              <label>
                Specialization:
                <input
                  className="inp1"
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                University:
                <input
                  className="inp1"
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                />
              </label>

              <label>
                Job Title:
                <input
                  className="inp1"
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Current Employer:
                <input
                  className="inp1"
                  type="text"
                  name="currentEmployer"
                  value={formData.currentEmployer}
                  onChange={handleChange}
                />
              </label>
              <label>
                Total Years of Experience:
                <input
                  className="inp1"
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Industry:
                <input
                  className="inp1"
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </label>
              <label>
                Achievements:
                <input
                  className="inp1"
                  type="text"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Impactful Work at Workplace:
                <input
                  className="inp1"
                  type="text"
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                />
              </label>
              <label>
                Notable Project:
                <input
                  className="inp1"
                  type="text"
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Quantified Work:
                <input
                  className="inp1"
                  type="text"
                  name="quantifiedWorks"
                  value={formData.quantifiedWorks}
                  onChange={handleChange}
                />
              </label>
              <label>
                Challenges Overcome:
                <input
                  className="inp1"
                  type="text"
                  name="challengesOvercome"
                  value={formData.challengesOvercome}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Publications:
                <input
                  className="inp1"
                  type="text"
                  name="publications"
                  value={formData.publications}
                  onChange={handleChange}
                />
              </label>
              <label>
                Industry Insights:
                <input
                  className="inp1"
                  type="text"
                  name="industryInsight"
                  value={formData.industryInsight}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button className="midBtn" type="submit">
              Submit
            </button>
          </form>

          {generatedArticle && (
            <div className="chat bot">
              {/* <h2>Generated Article:</h2> */}
              <img src={download} alt="" className="chatImg" />
              <p className="txt">{generatedArticle}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
