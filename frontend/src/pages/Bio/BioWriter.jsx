import React, { useState } from "react";
import "./biowriter.css";
import download from "./assets/download.png";
import SideBar from "../../components/SideBar";
import SidebarTail from "../../components/SidebarTail";
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
        // "http://localhost:5000/api/v1/ArticelWriter/bio-writer",
        "http://15.206.166.198/api/v1/ArticelWriter/bio-writer",
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
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Name"
                  type="text"
                  name="bioName"
                  value={formData.bioName}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
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
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="What skills, value do you bring to the table:"
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
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
                  className="inp1 bg-[#FFFFFF] shadow-md"
                  placeholder="A Highlight from your career:"
                  type="text"
                  name="careerHighlight"
                  value={formData.careerHighlight}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
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
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Proficiency:"
                  type="text"
                  name="proficiency"
                  value={formData.proficiency}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
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
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Judging/Reviewing Opportunities Served:"
                  type="text"
                  name="judgingOpportunity"
                  value={formData.judgingOpportunity}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
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
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Vision:"
                  type="text"
                  name="vision"
                  value={formData.vision}
                  onChange={handleChange}
                />
              </label>
              <label>
                
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Awards & Recognitions Conferred"
                  type="text"
                  name="recognitionOrAwards"
                  value={formData.recognitionOrAwards}
                  onChange={handleChange}
                />
              </label>
            </div>

            <button className="midBtn bg-gradient-to-r from-[#AA22FF] via-[#D989FF] to-[#51FFE0] mt-[3rem]" type="Submit">Generate BIO</button>
          </form>

          {generatedArticle && (
            <div className="chat bot bg-white max-w-[85rem] shadow-md">
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

export default BioWriter;
