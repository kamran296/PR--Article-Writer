import React, { useEffect, useState } from "react";
import SidebarTail from "./../../components/SidebarTail";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const hostDevelopment = "http://localhost:5000/api/v1/allInfo/get-all";

  const loadData = async () => {
    try {
      const response = await fetch(hostDevelopment, {
        method: "GET",
      });
      const val = await response.json();
      console.log(val, "val");
      setData(val);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <SidebarTail />
      <div className="App">
        <div>
          <div className="flex items-center w-screen justify-center min-h-screen">
            <div className="col-span-12">
              <div className="overflow-auto lg:overflow-visible">
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
                    {data.length > 0 ? (
                      data.map((entry, index) => (
                        <tr
                          key={index}
                          className="bg-[#ffffff] shadow-md h-[6rem]"
                        >
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <div className="ml-[3rem]">
                                <div className="font-bold">
                                  {entry.modelName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex justify-center mt-[1rem]">
                              {entry.previousLength}
                            </div>
                          </td>
                          <td className="p-3 ">
                            <div className="flex font-medium justify-center mt-[1rem]">
                              {entry.currentLength}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex font-medium justify-center mt-[1rem]">
                              {entry.currentLength - entry.previousLength}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex justify-center items-center">
                              <button
                                className="midBtn bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                                type="submit"
                              >
                                Train Now
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Loading data...
                        </td>
                      </tr>
                    )}
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
