import React, { useState } from "react";
import "./loaform.css";
import download from "./assets/download.png";
import SidebarTail from "../../components/SidebarTail";

const LoaOriginal = ({ type }) => {
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
        "http://15.206.166.198/api/v1/ArticelWriter/loa-original",
        // "http://localhost:5000/api/v1/ArticelWriter/loa-original",
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
      <div className="App ml-[-12rem]">
        <div className="main">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Recipient's Name"
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Recipient's Organization/University"
                  type="text"
                  name="recipientOrganization"
                  value={formData.recipientOrganization}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Sender's Name"
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Sender's Organization/Institution"
                  type="text"
                  name="senderOrganization"
                  value={formData.senderOrganization}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Sender's Relationship with the Recipient"
                  type="text"
                  name="senderRelationship"
                  value={formData.senderRelationship}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Concerned Field of Work"
                  type="text"
                  name="concernedFieldOfWork"
                  value={formData.concernedFieldOfWork}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Niche Domain (if any)"
                  type="text"
                  name="nicheDomain"
                  value={formData.nicheDomain}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Source of Knowledge"
                  type="text"
                  name="sourceOfKnowledge"
                  value={formData.sourceOfKnowledge}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="row">
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Previous Contributions"
                  type="text"
                  name="previousContributions"
                  value={formData.previousContributions}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Reciepent Role Description"
                  type="text"
                  name="recipientRoleDescription"
                  value={formData.recipientRoleDescription}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Responsibilities Undertaken"
                  type="text"
                  name="responsibilitiesUndertaken"
                  value={formData.responsibilitiesUndertaken}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Reciepent Key Skills"
                  type="text"
                  name="keySkills"
                  value={formData.keySkills}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Projects"
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Challenges Faced"
                  type="text"
                  name="challengesFaced"
                  value={formData.challengesFaced}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
                  placeholder="Outcome /Achievements"
                  type="text"
                  name="outcomeAchievements"
                  value={formData.outcomeAchievements}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  className="inp1 bg-[#FFFFFF] shadow-md "
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

export default LoaOriginal;
