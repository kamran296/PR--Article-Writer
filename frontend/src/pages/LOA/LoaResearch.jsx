import React, { useState } from "react";
import "./loaform.css";
import download from "./assets/download.png";
import SidebarTail from "../../components/SidebarTail";

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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Generating article");
    try {
      const response = await fetch(
        // "http://localhost:5000/api/v1/ArticelWriter/loa-research",
        "http://15.206.166.198/api/v1/ArticelWriter/loa-research",
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // State for generated article
  const [generatedArticle, setGeneratedArticle] = useState("");

  return (
    <>
      <div className="App">
        <div className="main">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label>
                Recipient's Name:
                <input
                  className="inp1"
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Recipient's Organization/University:
                <input
                  className="inp1"
                  type="text"
                  name="recipientOrganization"
                  value={formData.recipientOrganization}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Sender's Name:
                <input
                  className="inp1"
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Sender's Organization/Institution:
                <input
                  className="inp1"
                  type="text"
                  name="senderOrganization"
                  value={formData.senderOrganization}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Sender's Relationship with the Recipient:
                <input
                  className="inp1"
                  type="text"
                  name="senderRelationship"
                  value={formData.senderRelationship}
                  onChange={handleChange}
                />
              </label>
              <label>
                Concerned Field of Work:
                <input
                  className="inp1"
                  type="text"
                  name="concernedFieldOfWork"
                  value={formData.concernedFieldOfWork}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Niche Domain (if any):
                <input
                  className="inp1"
                  type="text"
                  name="nicheDomain"
                  value={formData.nicheDomain}
                  onChange={handleChange}
                />
              </label>
              <label>
                Source of Knowledge:
                <input
                  className="inp1"
                  type="text"
                  name="sourceOfKnowledge"
                  value={formData.sourceOfKnowledge}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                Previous Contributions:
                <input
                  className="inp1"
                  type="text"
                  name="previousContributions"
                  value={formData.previousContributions}
                  onChange={handleChange}
                />
              </label>
              <label>
                Title of paper
                <input
                  className="inp1"
                  type="text"
                  name="titleOfPaper"
                  value={formData.titleOfPaper}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <label>
                Aspect Of Paper
                <input
                  className="inp1"
                  type="text"
                  name="AspectOfPaper"
                  value={formData.AspectOfPaper}
                  onChange={handleChange}
                />
              </label>
              <label>
                Novelty Of Work
                <input
                  className="inp1"
                  type="text"
                  name="noveltyOfWork"
                  value={formData.noveltyOfWork}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <label>
                Significance For Future Works:
                <input
                  className="inp1"
                  type="text"
                  name="significanceForFutureWork"
                  value={formData.significanceForFutureWork}
                  onChange={handleChange}
                />
              </label>
              <label>
                Takeaway From Paper
                <input
                  className="inp1"
                  type="text"
                  name="takeawayFromPaper"
                  value={formData.takeawayFromPaper}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <label>
                Detailed Description
                <input
                  className="inp1"
                  type="text"
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleChange}
                />
              </label>
              <label>
                Publication
                <input
                  className="inp1"
                  type="text"
                  name="Publication"
                  value={formData.Publication}
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

export default LoaResearch;
