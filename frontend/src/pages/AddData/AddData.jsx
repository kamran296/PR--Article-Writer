import React, { useState } from "react";
import SidebarTail from "../../components/SidebarTail";
import Navbar from "../../components/Navbar";

const AddData = () => {
  const [formData, setFormData] = useState({
    dropdownOption: "",
    question: "",
    answer: "",
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

    let apiEndpoint = "";

    switch (formData.dropdownOption) {
      case "Article Writer":
        apiEndpoint =
          "https://www.internal.cachelabs.io/api/v1/ArticleWriter/add-data";
        break;
      case "Chatbot":
        apiEndpoint =
          "https://www.internal.cachelabs.io/api/v1/chatbot/add-data";
        break;
      case "LOA Original":
        apiEndpoint =
          "https://www.internal.cachelabs.io/api/v1/loa/original-data";
        break;
      case "LOA Critical":
        apiEndpoint =
          "https://www.internal.cachelabs.io/api/v1/loa/critical-data";
        break;
      case "LOA Research":
        apiEndpoint =
          "https://www.internal.cachelabs.io/api/v1/loa/research-data";
        break;
      case "LOR":
        apiEndpoint = "https://www.internal.cachelabs.io/api/v1/lor/add-data";
        break;
      case "Bio Writer":
        apiEndpoint = "https://www.internal.cachelabs.io/api/v1/bio/add-data";
        break;
      default:
        apiEndpoint = "";
        break;
    }

    if (apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: formData.question,
            answer: formData.answer,
          }),
        });
        console.log("Response from API:", response);
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    } else {
      console.error("Invalid API endpoint");
    }
  };

  return (
    <>
      <div className="h-screen ">
        <div>
          <Navbar />
          <div className="mt-8">
            <SidebarTail />
          </div>
        </div>

        <div className="heading fixed  flex flex-col items-center justify-center mt-32 ml-[25%]">
          <p className="text-3xl"> Add Data </p>
          <div className="form mt-12  w-[600px] h-[500px]">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 ">
                <label
                  htmlFor="dropdownOption"
                  className="block text-2xl font-medium text-black mt-2"
                >
                  Select Tool
                </label>
                <select
                  id="dropdownOption"
                  name="dropdownOption"
                  value={formData.dropdownOption}
                  onChange={handleChange}
                  className="mt-2 block w-full text-2xl px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none "
                >
                  <option value="" disabled className="text-xl">
                    Select Tool
                  </option>
                  <option value="option1" className="text-xl">
                    Article Writer
                  </option>
                  <option value="option2" className="text-xl">
                    Chatbot
                  </option>
                  <option value="option3" className="text-xl">
                    LOR
                  </option>
                  <option value="option4" className="text-xl">
                    Bio Writer
                  </option>
                  <option value="option5" className="text-xl">
                    LOA Original
                  </option>
                  <option value="option6" className="text-xl">
                    LOA Critical
                  </option>
                  <option value="option7" className="text-xl">
                    LOA Research
                  </option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="question"
                  className="block text-2xl mt-2 font-large text-gray-700"
                >
                  Prompt
                </label>
                <textarea
                  type="text"
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-2xl"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="answer"
                  className="block mt-2 text-2xl font-large text-gray-700"
                >
                  Result
                </label>
                <textarea
                  type="text"
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  className="mt-2 h-52 w-full bg-white border-2 border-gray-300 rounded-xl text-2xl "
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 text-2xl bg-primary text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddData;
