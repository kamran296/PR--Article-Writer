import React, { useEffect, useState } from "react";
import SidebarTail from "./../../components/SidebarTail";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const hostDevelopment =
    "https://www.internal.cachelabs.io/api/v1/allInfo/get-all";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log("Loading data...");
      const response = await fetch(hostDevelopment, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const val = await response.json();
      const mappedData = val.map((item) => {
        if (item.modelName === "chats") item.modelName = "ChatBot";
        if (item.modelName === "articles") item.modelName = "Article Writer";
        if (item.modelName === "biowriterdatas") item.modelName = "Bio Writer";
        if (item.modelName === "loaoriginals") item.modelName = "LOA Original";
        if (item.modelName === "loacriticals") item.modelName = "LOA Critical";
        if (item.modelName === "loaresearches") item.modelName = "LOA Research";
        if (item.modelName === "lordatas") item.modelName = "LOR";
        if (item.modelName === "nichedatas") item.modelName = "Niche Writer";
        if (item.modelName === "clientchatbots")
          item.modelName = "Sales Chatbot";

        return item;
      });
      console.log(mappedData, "mappedData");
      setData(mappedData);
      console.log(val, "val");
      setData(val);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = async (modelName, previousLength, currentLength) => {
    try {
      // Disable handleClick if the difference between previousLength and currentLength is less than 10
      if (currentLength - previousLength < 10) {
        console.log(
          "The difference between the previous and current length is less than 10. Operation disabled."
        );
        return; // Exit the function early to disable the click
      }

      let host = "";
      if (modelName === "ChatBot") {
        host = "https://www.internal.cachelabs.io/api/v1/chatbot/fine-tune";
      } else if (modelName === "Article Writer") {
        host =
          "https://www.internal.cachelabs.io/api/v1/ArticleWriter/fine-tune";
      } else if (modelName === "LOA Original") {
        host = "https://www.internal.cachelabs.io/api/v1/loa/original-finetune";
      } else if (modelName === "LOA Critical") {
        host = "https://www.internal.cachelabs.io/api/v1/loa/critical-finetune";
      } else if (modelName === "LOA Research") {
        host = "https://www.internal.cachelabs.io/api/v1/loa/research-finetune";
      } else if (modelName === "LOR") {
        host = "https://www.internal.cachelabs.io/api/v1/lor/fine-tune";
      } else if (modelName === "Bio Writer") {
        host = "https://www.internal.cachelabs.io/api/v1/bio/fine-tune";
      } else if (modelName === "Niche Writer") {
        host = "https://www.internal.cachelabs.io/api/v1/niche/fine-tune";
      } else if (modelName === "Sales Chatbot") {
        host =
          "https://www.internal.cachelabs.io/api/v1/client-chatbot/fine-tune";
      }

      const response = await fetch(host, {
        method: "POST", // Change to POST request
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ currentLength }), // Pass currentLength as a parameter
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Model is fine-tuning", data);
    } catch (err) {
      console.log("Error in fine-tuning:", err);
    }
  };

  return (
    <>
      <SidebarTail />
      <div className="App">
        <div>
          <div className="flex items-center w-screen justify-center min-h-screen">
            <div className="col-span-12">
              <div className="overflow-auto lg:overflow-visible ">
                <table className="table text-black border-separate ml-[4rem] space-y-6 text-2xl">
                  <thead className="bg-[#ffffff] shadow-md text-black">
                    <tr className="h-[6rem] bg-purple-100 text-black">
                      <th className="p-3 ml-2">AI tools</th>
                      <th className="p-3 ml-2 w-[11rem] text-left">
                        <div className="flex justify-center">
                          Previously Trained Data
                        </div>
                      </th>
                      <th className="p-3 ml-2 w-[16rem] text-left">
                        <div className="flex justify-center">Updated Data</div>
                      </th>
                      <th className="p-3 ml-2 text-left">New Data</th>
                      <th className="p-3 text-left">
                        <div className="flex justify-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 &&
                      data.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-[#ffffff] shadow-md h-[6rem]"
                        >
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <div className="ml-[3rem]">
                                <div className="font-bold">
                                  {item.modelName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex justify-center mt-[1rem]">
                              {item.previousLength}
                            </div>
                          </td>
                          <td className="p-3 ">
                            <div className="flex justify-center mt-[1rem]">
                              {item.currentLength}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex justify-center mt-[1rem]">
                              {item.currentLength - item.previousLength}
                            </div>
                          </td>
                          <td className="p-3 ">
                            <div className="flex justify-center items-center">
                              <button
                                className="midBtn bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                                type="submit"
                                onClick={() =>
                                  handleClick(
                                    item.modelName,
                                    item.previousLength,
                                    item.currentLength
                                  )
                                }
                                disabled={
                                  item.currentLength - item.previousLength < 10
                                } // Disable button if difference is less than 10
                              >
                                Train Now
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n\t.table {\n\t\tborder-spacing: 0 15px;\n\t}\n\n\ti {\n\t\tfont-size: 1rem !important;\n\t}\n\n\t.table tr {\n\t\tborder-radius: 20px;\n\t}\n\n\ttr td:nth-child(n+5),\n\ttr th:nth-child(n+5) {\n\t\tborder-radius: 0 .625rem .625rem 0;\n\t}\n\n\ttr td:nth-child(1),\n\ttr th:nth-child(1) {\n\t\tborder-radius: .625rem 0 0 .625rem;\n\t}\n",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
