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
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>

              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Expertise"
                  type="text"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Highest Degree"
                  type="text"
                  name="highestDegree"
                  value={formData.highestDegree}
                  onChange={handleChange}
                />
              </label>

              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Specialization"
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="University"
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                />
              </label>

              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Job Title"
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Current Employer"
                  type="text"
                  name="currentEmployer"
                  value={formData.currentEmployer}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Total Years of Experience"
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Industry"
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Achievements"
                  type="text"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Impactful Work at Workplace"
                  type="text"
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF]  shadow-md "
                  placeholder="Notable Project"
                  type="text"
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Quantified Work"
                  type="text"
                  name="quantifiedWorks"
                  value={formData.quantifiedWorks}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Challenges Overcome"
                  type="text"
                  name="challengesOvercome"
                  value={formData.challengesOvercome}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Publications"
                  type="text"
                  name="publications"
                  value={formData.publications}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 text-black bg-[#FFFFFF] shadow-md "
                  placeholder="Industry Insights"
                  type="text"
                  name="industryInsight"
                  value={formData.industryInsight}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button className="midBtn bg-gradient-to-r from-[#AA22FF] via-[#D989FF] to-[#51FFE0] mt-[3rem]" type="submit">
              Start Working with AI
            </button>
          </form>

          {generatedArticle && (
            <div className="chat bot bg-white max-w-[85rem] shadow-md ">
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
