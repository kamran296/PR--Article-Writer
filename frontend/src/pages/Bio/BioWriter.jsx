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
        <div className="main">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label>
                Name:
                <input
                  className="inp1"
                  type="text"
                  name="bioName"
                  value={formData.bioName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Professional Experience
                <input
                  className="inp1"
                  type="text"
                  name="professionalExperience"
                  value={formData.professionalExperience}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                What skills, value do you bring to the table:
                <input
                  className="inp1"
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </label>
              <label>
                Something about your background:
                <input
                  className="inp1"
                  type="text"
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                A Highlight from your career:
                <input
                  className="inp1"
                  type="text"
                  name="careerHighlight"
                  value={formData.careerHighlight}
                  onChange={handleChange}
                />
              </label>
              <label>
                What you commit to as a professional in your respective field of
                work:
                <input
                  className="inp1"
                  type="text"
                  name="commitments"
                  value={formData.commitments}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Proficiency:
                <input
                  className="inp1"
                  type="text"
                  name="proficiency"
                  value={formData.proficiency}
                  onChange={handleChange}
                />
              </label>
              <label>
                Academic Excellence:
                <input
                  className="inp1"
                  type="text"
                  name="academicExcellence"
                  value={formData.academicExcellence}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Judging/Reviewing Opportunities Served:
                <input
                  className="inp1"
                  type="text"
                  name="judgingOpportunity"
                  value={formData.judgingOpportunity}
                  onChange={handleChange}
                />
              </label>
              <label>
                Press/Media Coverage
                <input
                  className="inp1"
                  type="text"
                  name="pressOrMedia"
                  value={formData.pressOrMedia}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <label>
                Vision:
                <input
                  className="inp1"
                  type="text"
                  name="vision"
                  value={formData.vision}
                  onChange={handleChange}
                />
              </label>
              <label>
                Awards & Recognitions Conferred
                <input
                  className="inp1"
                  type="text"
                  name="recognitionOrAwards"
                  value={formData.recognitionOrAwards}
                  onChange={handleChange}
                />
              </label>
            </div>

            <button type="Submit">Generate LOA</button>
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

export default BioWriter;
