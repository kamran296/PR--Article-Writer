import React from 'react';
import Navbar from './navbar'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SalaryPieChart2 from './Pichart2';
import BellCurve2 from './Bellcurve2';
import './output.css'
import Logo from './assets/logoSGC.jpeg'
import InlineComparison from './InlineComparison';
import FaqAccordion from './FAQ';
import SourceLinks from './SourceLinks';

const ResultPage = () => {

    const { state } = useLocation();
    const { inputData, results , additionalResponse} = state;

    const [jobTitle1Response, setJobTitle1Response] = useState(null);
    const [jobTitle2Response, setJobTitle2Response] = useState(null);
    const [jobTitle3Response, setJobTitle3Response] = useState(null);

    // for pichart
    const baseSalary = parseFloat(inputData.baseSalary);
    const bonusSalary = parseFloat(inputData.bonusSalary);
    const stocksComponent = parseFloat(inputData.stocks);

    // for BellCurve
    const labels = ['start', 'End', 'Extended'];

    const [label1, setLabel1] = useState([]);
    const [label2, setLabel2] = useState([]);
    const [label3, setLabel3] = useState([]);


    useEffect(() => {
        const calculateAverage = (values) => {
            const nonZeroValues = values.filter(value => value !== 0);
            if (nonZeroValues.length === 0) return 0;
            return nonZeroValues.reduce((acc, val) => acc + val, 0) / nonZeroValues.length;
        };

        const mapResultsToResponse = (result) => {
          const salaryComHigh = result.highSalaries.salaryCom;
          const indeedHigh = result.highSalaries.indeed;
          const talentHigh = result.highSalaries.talent;
          const monsterHigh = result.highSalaries.monster;
          const levelsHigh = result.highSalaries.levels;

          const salaryComMid = result.midSalaries.salaryCom;
          const indeedMid = result.midSalaries.indeed;
          const talentMid = result.midSalaries.talent;
          const monsterMid = result.midSalaries.monster;
          const levelsMid = result.midSalaries.levels;

          const averageHighSalary = calculateAverage([salaryComHigh, indeedHigh, talentHigh, monsterHigh, levelsHigh]);
          const averageMidSalary = calculateAverage([salaryComMid, indeedMid, talentMid, monsterMid, levelsMid]);

            return {
                jobTitle: result.jobTitle,
                highSalaries: result.highSalaries,
                midSalaries: result.midSalaries,
                averageHighSalary,
                averageMidSalary,
                isBaseGreaterThanAverage: parseInt(inputData.baseSalary, 10) > averageHighSalary,
            };
        };

        setJobTitle1Response(mapResultsToResponse(results[0]));
        setJobTitle2Response(mapResultsToResponse(results[1]));
        setJobTitle3Response(mapResultsToResponse(results[2]));
    }, [inputData.baseSalary, results]);

    useEffect(() => {
        if (jobTitle1Response) {
            setLabel1([
                jobTitle1Response.averageHighSalary.toLocaleString(),
                jobTitle1Response.averageMidSalary.toLocaleString(),
                parseFloat(inputData.baseSalary).toLocaleString(),
            ]);
        }
    }, [jobTitle1Response, inputData.baseSalary]);
    
    useEffect(() => {
        if (jobTitle2Response) {
            setLabel2([
                jobTitle2Response.averageHighSalary.toLocaleString(),
                jobTitle2Response.averageMidSalary.toLocaleString(),
                parseFloat(inputData.baseSalary).toLocaleString(),
            ]);
        }
    }, [jobTitle2Response, inputData.baseSalary]);
    
    useEffect(() => {
        if (jobTitle3Response) {
            setLabel3([
                jobTitle3Response.averageHighSalary.toLocaleString(),
                jobTitle3Response.averageMidSalary.toLocaleString(),
                parseFloat(inputData.baseSalary).toLocaleString(),
            ]);
        }
    }, [jobTitle3Response, inputData.baseSalary]);

    const highSalary1 = jobTitle1Response ? jobTitle1Response.averageHighSalary : 0;
    const highSalary2 = jobTitle2Response ? jobTitle2Response.averageHighSalary : 0;
    const highSalary3 = jobTitle3Response ? jobTitle3Response.averageHighSalary : 0;


    let highSalaryString = "";
    if (!additionalResponse.level4Yr) {
      highSalaryString = "$0";
    }
    if (additionalResponse !== null) {
      const highSalaryString = additionalResponse.level4Yr.split('.')[0]; // Split at the decimal point and take the first part
      const socSalary = parseInt(highSalaryString.replace(/[^\d]/g, ''), 10);
  }

    const handlePrint = () => {
        window.print();
    };

    function evaluateSalaryCriteria(base, bonus, stocks, highSalary) {
        const margin = 5000;
    
        // Compare base salary
        if (base > highSalary + margin) {
            return "Criteria Satisfied";
        } else if (Math.abs(base - highSalary) <= margin) {
            return "Doubtful";
        } else if (base < highSalary - margin) {
            return "Unsatisfied";
        }
    
        // Compare base + bonus
        const basePlusBonus = base + bonus;
        if (basePlusBonus > highSalary + margin) {
            return "Criteria Satisfied";
        } else if (Math.abs(basePlusBonus - highSalary) <= margin) {
            return "Doubtful";
        } else if (basePlusBonus < highSalary - margin) {
            return "Unsatisfied";
        }
    
        // Compare base + bonus + stocks
        const totalCompensation = base + bonus + stocks;
        if (totalCompensation > highSalary + margin) {
            return "Criteria Satisfied";
        } else if (Math.abs(totalCompensation - highSalary) <= margin) {
            return "Doubtful";
        } else if (totalCompensation < highSalary - margin) {
            return "Unsatisfied";
        }
    }

    function SalaryComparisonComponent({ base, bonus, stocks, highSalary, jobTitle}) {
        const result = evaluateSalaryCriteria(base, bonus, stocks, highSalary);
    
        return (
          <div>
            {result === "Criteria Satisfied" && (
              <div className="flex flex-row mb-[1.65rem]">
                <div className="bg-green-500 w-[10rem] h-[3rem] text-[1.5rem] font-[590] text-white text-center py-4 flex items-center justify-center">
                  <p>Satisfied</p>
                </div>
                <p className="ml-[3rem] text-[1.5rem]">
                  Successful completion of the Criteria for{" "}
                  <strong>{jobTitle}</strong> in{" "}
                  <strong>{inputData.location}</strong>{" "}
                </p>
              </div>
            )}
            {result === "Doubtful" && (
              <div className="flex flex-row mb-[1.65rem]">
                <div className="bg-yellow-500 w-[10rem] h-[3rem] text-[1.5rem] font-[590] text-white text-center py-4 flex items-center justify-center">
                  <p>Doubtful</p>
                </div>
                <p className="ml-[3rem] text-[1.5rem]">
                  Partial completion of the Criteria for{" "}
                  <strong>{jobTitle}</strong> in{" "}
                  <strong>{inputData.location}</strong>{" "}
                </p>
              </div>
            )}
            {result === "Unsatisfied" && (
              <div className="flex flex-row mb-[1.65rem]">
                <div className="bg-red-500 w-[10rem] h-[3rem] text-[1.5rem] font-[590] text-white text-center py-4 flex items-center justify-center">
                  <p>Unsatisfied</p>
                </div>
                <p className="ml-[3rem] text-[1.5rem]">
                   The required Criteria was not satisfied for{" "}
                  <strong>{jobTitle}</strong> in{" "}
                  <strong>{inputData.location}</strong>{" "}
                </p>
              </div>
            )}
          </div>
        );
    }

    function NextSteps({ base, bonus, stocks, highSalary, jobTitle}) {
        const result = evaluateSalaryCriteria(base, bonus, stocks, highSalary);

        return (
            <div className="bg-blue-50 p-12 rounded-lg shadow-md w-full">
            {result === "Criteria Satisfied" && (
              <div className="text-[1.65rem] text-green-700 font-semibold">
                <p className="mb-4">
                  Congratulations! Your analysis shows that your salary meets USCIS standards for a high salary. You are good to go and can skip Award and Membership criteria with only 1-2 award/membership for final merits.
                </p>
              </div>
            )}
            {result === "Unsatisfied" && (
              <div className="text-[1.65rem] text-red-700">
                <p className="font-semibold mb-4">Since your analysis shows that your salary does not meet USCIS standards for a high salary, you have two main options:</p>
                <ul className="list-disc list-inside">
                  <li>Ask the team to rerun the analysis for any similar job title as per your work/roles and responsibilities.</li>
                  <li>Request a Salary Increase: Approach your employer for a salary hike or appraisal.</li>
                  <li>Focus on Other Criteria: Strengthen other parts of your EB-1A application, such as your Awards/Membership criteria. [Awards more than 3/Membership more than 3]</li>
                </ul>
              </div>
            )}
            {result === "Doubtful" && (
              <div className="text-[1.65rem] text-red-700">
                <p className="font-semibold mb-4">Since your analysis shows that your salary does not meet USCIS standards for a high salary, you have two main options:</p>
                <ul className="list-disc list-inside">
                  <li>Ask the team to rerun the analysis for any similar job title as per your work/roles and responsibilities.</li>
                  <li>Request a Salary Increase: Approach your employer for a salary hike or appraisal.</li>
                  <li>Focus on Other Criteria: Strengthen other parts of your EB-1A application, such as your Awards/Membership criteria. [Awards more than 3/Membership more than 3]</li>
                </ul>
              </div>
            )}
          </div>
        );
    }

  return (
    <div className="min-h-screen bg-gray-100">
      <div id="Navbar">
        <Navbar />
      </div>

      <div
        className="container mx-[19rem] w-[113rem] bg-slate-50 shadow-lg rounded-lg mt-12 pb-10 px-20 "
        id="main-content"
      >
        <div className="flex justify-center items-center h-[16rem]" id='CompanyLogo'>
          <img src={Logo} className="w-[11%] m-[3rem]" />
        </div>
        {/* Cards Section */}
        <div
          className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0 justify-center items-center "
          id="Cards-Section"
        >
          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg w-[45rem] h-[40rem]" id='Profile'>
            <div className="w-[12rem] h-[11rem] bg-indigo-100 mx-auto rounded-full shadow-lg inset-x-0 top-0 flex items-center justify-center text-indigo-500" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-[1.75rem] mt-[1.5rem] font-semibold ">Profile</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="text-[1.65rem] px-12 py-4 text-center font-semibold border-r border-gray-300">
                      Name
                    </td>
                    <td className="text-[1.65rem] px-12 py-4 text-center">
                      {inputData.firstName} {inputData.lastName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-[1.65rem] px-12 py-4 text-center font-semibold border-r border-gray-300">
                      Company
                    </td>
                    <td className="text-[1.65rem] px-12 py-4 text-center">
                      {inputData.company}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-[1.65rem] px-12 py-4 text-center font-semibold border-r border-gray-300">
                      Job Title
                    </td>
                    <td className="text-[1.65rem] px-12 py-4 text-center">
                      {inputData.jobTitles[0]}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-[1.65rem] px-12 py-4 text-center font-semibold border-r border-gray-300">
                      Location
                    </td>
                    <td className="text-[1.65rem] px-12 py-4 text-center">
                      {inputData.location}
                    </td>
                  </tr>
                  {additionalResponse && (
                  <tr>
                    <td className="text-lg px-4 py-2 text-center font-semibold border-r border-gray-300">
                      SOC code
                    </td>
                    <td className="text-lg px-4 py-2 text-center">
                      {inputData.code}
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-6 w-[45rem] h-[40rem]">
            <h2 className="text-[1.65rem] font-semibold">
              Compensation (in USD)
            </h2>
            <div className="w-[40rem] h-[32rem] mb-[1rem] flex justify-center items-center">
              <SalaryPieChart2
                baseSalary={baseSalary}
                bonusSalary={bonusSalary}
                stocksComponent={stocksComponent}
              />
            </div>
          </div>
        </div>

        <div
          className="flex flex-col justify-center items-center mt-[3rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem] h-[22.5rem]"
          id="Status-Summary"
        >
          <div>
            <h2 className="text-[1.65rem] font-semibold mb-8">Status Summary</h2>
          </div>
          <SalaryComparisonComponent
            base={baseSalary}
            bonus={bonusSalary}
            stocks={stocksComponent}
            highSalary={highSalary1}
            jobTitle={inputData.jobTitles[0]}
          />
          <SalaryComparisonComponent
            base={baseSalary}
            bonus={bonusSalary}
            stocks={stocksComponent}
            highSalary={highSalary2}
            jobTitle={inputData.jobTitles[1]}
          />
          <SalaryComparisonComponent
            base={baseSalary}
            bonus={bonusSalary}
            stocks={stocksComponent}
            highSalary={highSalary3}
            jobTitle={inputData.jobTitles[2]}
          />
        </div>

        {/* SOC DATA DISPLAY */}
        {additionalResponse && (
        <div className="flex flex-col justify-cente items-center mt-[3rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem] h-[50rem]">
          <div className="mb-[1rem] mt-[2rem]">
            <h2 className="text-[1.65rem] font-semibold">Analysis Using SOC Code</h2>
          </div>
          <div className="flex">
            <div className="w-[40rem] h-[21rem] mt-[1rem]">
              <div className="">
                <div
                  className="align-middle inline-block min-w-full overflow-hidden bg-white shadow-dashboard px-12 pt-6 rounded-bl-lg rounded-br-lg"
                  id="Table"
                >
                  <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-blue-100 text-blue-800">
                      <tr>
                        <th className="px-4 text-center py-6 text-left text-[1.3rem] font-semibold">
                          Wage Level
                        </th>
                        <th className="px-12 py-6 text-center text-left text-[1.3rem] font-semibold">
                          Hourly
                        </th>
                        <th className="px-12 py-6 text-center text-left text-[1.3rem] font-semibold">
                          Yearly
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-900 text-[1.5rem]">
                      <tr className="border-t border-gray-200">
                        <td className="px-10 py-8">
                          <div className="font-medium text-[1.5rem] text-center text-blue-900">
                            I
                          </div>
                        </td>
                        <td className="px-10 py-8 text-[1.5rem]">
                          {additionalResponse.level1Hr}
                        </td>
                        <td className="px-10 py-8 ">
                          <div className="text-blue-600  font-semibold">
                            {additionalResponse.level1Yr}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="px-10 py-8">
                          <div className="font-medium text-center text-blue-900">
                            II
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          {additionalResponse.level2Hr}
                        </td>
                        <td className="px-10 py-8 ">
                          <div className="text-blue-600 font-semibold">
                            {additionalResponse.level2Yr}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="px-10 py-8">
                          <div className="font-medium text-center text-blue-900">
                            III
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          {additionalResponse.level3Hr}
                        </td>
                        <td className="px-10 py-8 ">
                          <div className="text-blue-600 font-semibold">
                            {additionalResponse.level3Yr}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="px-10 py-8">
                          <div className="font-medium text-center text-blue-900">
                            IV
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          {additionalResponse.level4Hr}
                        </td>
                        <td className="px-10 py-8 ">
                          <div className="text-blue-600 font-semibold">
                            {additionalResponse.level4Yr}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="px-10 py-8">
                          <div className="font-medium text-center text-blue-900">
                            Mean
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          {additionalResponse.meanHr}
                        </td>
                        <td className="px-10 py-8 ">
                          <div className="text-blue-600 font-semibold">
                            {additionalResponse.meanYr}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex justify-center h-[40rem] items-center w-[43rem] ml-[6rem]">
              <InlineComparison
                baseSalary={baseSalary}
                bonus={bonusSalary}
                stocks={stocksComponent}
                highSalary={socSalary}
              />
            </div>
          </div>
        </div>
        )}

        {/* Graph Section */}

        {/* Job Title 1 */}
        <div className="flex flex-col justify-center items-center mt-[1rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem] h-[34rem]">
          <div className="mb-[rem] mt-[rem]">
            <h2 className="text-[1.65rem] font-semibold">{inputData.jobTitles[0]}</h2>
          </div>
          <div className="flex">
            <div className="w-[40.5rem] h-[19rem] mt-[4rem]">
              <BellCurve2 labels={label1} />
            </div>
            <div className="flex justify-center items-center w-[43rem] ml-[7rem]">
              <InlineComparison
                baseSalary={baseSalary}
                bonus={bonusSalary}
                stocks={stocksComponent}
                highSalary={highSalary1}
              />
            </div>
          </div>
        </div>

        {/* Job Title 2 */}
        <div
          className="flex flex-col justify-center items-center mt-[1rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem] h-[34rem]"
          id="Job-Title-2"
        >
          <div className="mb-[rem] mt-[rem]">
            <h2 className="text-[1.65rem] font-semibold">{inputData.jobTitles[1]}</h2>
          </div>
          <div className="flex">
            <div className="w-[40.5rem] h-[19rem] mt-[4rem]">
              <BellCurve2 labels={label2} />
            </div>
            <div className="flex justify-center items-center w-[43rem] ml-[7rem]">
              <InlineComparison
                baseSalary={baseSalary}
                bonus={bonusSalary}
                stocks={stocksComponent}
                highSalary={highSalary2}
              />
            </div>
          </div>
        </div>

        {/* Job Title 3 */}
        <div className="flex flex-col justify-center items-center mt-[1rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem] h-[34rem] mb-[1rem]">
          <div className="mb-[rem] mt-[rem]">
            <h2 className="text-[1.65rem] font-semibold">{inputData.jobTitles[2]}</h2>
          </div>
          <div className="flex">
            <div className="w-[40.5rem] h-[19rem] mt-[4rem]">
              <BellCurve2 labels={label3} />
            </div>
            <div className="flex justify-center items-center w-[43rem] ml-[7rem]">
              <InlineComparison
                baseSalary={baseSalary}
                bonus={bonusSalary}
                stocks={stocksComponent}
                highSalary={highSalary3}
              />
            </div>
          </div>
        </div>

        {/* Table component */}
        <div className="flex flex-col bg-white mt-[1rem] my-2 w-[93rem] ml-[5rem] shadow-lg rounded-lg" id='TableBG'>
          <div className="flex justify-center mb-[1rem] mt-[1.5rem]">
            <h2 className="text-[1.65rem] font-semibold">Evidence</h2>
          </div>
          <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-12 pt-6 rounded-bl-lg rounded-br-lg" id='Table'>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="px-12 text-center py-6 text-left text-[1.3rem] font-semibold">
                    Evidence
                  </th>
                  <th className="px-12 py-6 text-center text-left text-[1.3rem] font-semibold">
                    Base Salary
                  </th>
                  <th className="px-12 py-6 text-center text-left text-[1.3rem] font-semibold">
                    Notes
                  </th>
                  <th className="px-12 py-6 text-center text-left text-[1.3rem] font-semibold">
                    Salary Component
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-900 text-[1.5rem]">
                {jobTitle1Response && (
                  <>
                    {jobTitle1Response.highSalaries.indeed !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle1Response.highSalaries.indeed;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  indeed.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle1Response.highSalaries.indeed.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8 ">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}

                    {jobTitle1Response.highSalaries.talent !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle1Response.highSalaries.talent;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  talent.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle1Response.highSalaries.talent.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}

                    {jobTitle1Response.highSalaries.salaryCom !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle1Response.highSalaries.salaryCom;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  salary.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle1Response.highSalaries.salaryCom.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}
                  </>
                )}
                {jobTitle2Response && (
                  <>
                    {jobTitle2Response.highSalaries.indeed !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle2Response.highSalaries.indeed;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  indeed.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle2Response.highSalaries.indeed.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}
                    {jobTitle2Response.highSalaries.talent !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle2Response.highSalaries.talent;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  talent.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle2Response.highSalaries.talent.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}
                    {jobTitle2Response.highSalaries.salaryCom !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle2Response.highSalaries.salaryCom;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  salary.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle2Response.highSalaries.salaryCom.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}
                  </>
                )}
                {jobTitle3Response && (
                  <>
                    {jobTitle3Response.highSalaries.indeed !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle3Response.highSalaries.indeed;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  indeed.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle3Response.highSalaries.indeed.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}
                    {jobTitle3Response.highSalaries.talent !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle3Response.highSalaries.talent;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  talent.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle3Response.highSalaries.talent.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}
                    {jobTitle3Response.highSalaries.salaryCom !== 0 &&
                      (() => {
                        const highSalary =
                          jobTitle3Response.highSalaries.salaryCom;
                        const totalCompensation =
                          baseSalary + bonusSalary + stocksComponent;
                        let displaySalary = null;
                        let SalaryComponent = null;

                        if (baseSalary > highSalary) {
                          displaySalary = baseSalary;
                          SalaryComponent = "Base Salary";
                        } else if (baseSalary + bonusSalary > highSalary) {
                          displaySalary = baseSalary + bonusSalary;
                          SalaryComponent = "Base and Bonus combined";
                        } else if (totalCompensation > highSalary) {
                          displaySalary = totalCompensation;
                          SalaryComponent = "Total compensation";
                          //   including Base, Bonus and stocks/RSU/others
                        }

                        if (displaySalary) {
                          return (
                            <tr className="border-t border-gray-200">
                              <td className="pl-10 pr-6 py-8">
                                <div className="text-[1.5rem] font-semibold text-blue-900">
                                  salary.com for {inputData.jobTitles[1]} in{" "}
                                  {inputData.location}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-blue-600 text-[1.5rem] font-semibold">
                                  $
                                  {jobTitle3Response.highSalaries.salaryCom.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-10 py-8 text-center">
                                Mr {inputData.firstName}'s Salary of $
                                {displaySalary.toLocaleString()} exceeds his{" "}
                                {inputData.jobTitles[1]} counterparts in{" "}
                                {inputData.location}
                              </td>
                              <td className="px-10 py-8">{SalaryComponent}</td>
                            </tr>
                          );
                        }

                        return null;
                      })()}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        
        
        {/* Next steps ------------------------------------------------------------- */}
        <div className="flex flex-col justify-center items-center pb-[1rem] mt-[2rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem] mb-[2rem]" id='Next-Steps'>
          <div className="mb-[2rem] mt-[2rem]">
            <h2 className="text-[1.65rem] font-semibold">Next Steps</h2>
          </div>
          <div className="px-[5rem] mb-[1.5rem]">
            <NextSteps
              base={baseSalary}
              bonus={bonusSalary}
              stocks={stocksComponent}
              highSalary={highSalary1}
              jobTitle={inputData.jobTitles[0]}
            />
          </div>
        </div>

        {/* Evidence to collect -------------------------------------------------- */}
        <div
          className="flex flex-col justify-center items-center pb-[1.5rem] mt-[1.5rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem] mb-[1rem]"
          id='Evidence'
        >
          <div className="mb-[2rem] mt-[3rem]">
            <h2 className="text-[1.65rem] font-semibold">Evidence Collection</h2>
          </div>
          <div className="h-full w-[95%] rounded-lg bg-gradient-to-b from-blue-50 to-gray-100 px-[3.5rem] pt-[5rem] p-8">
          <div className="grid gap-14 md:grid-cols-2 md:gap-7">
            {/* Card 1 */}
            <div className="rounded-xl bg-white p-10 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mx-auto flex h-[6.5rem] w-[6.5rem] -translate-y-20 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-400/40 print-bg-color print-shadow">
                <svg
                  viewBox="0 0 33 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white print-svg-color"
                >
                  <path
                    d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-gray-800 mb-3 text-[1.65rem] font-semibold lg:px-18">
              Salary Slips/Pay Stubs
              </h1>
              <p className="px-4 text-[1.5rem] text-gray-600">
              Collect your pay stubs for the last 6 months (3 months at least).
              </p>
            </div>
            {/* Card 2 */}
            <div
              data-aos-delay={150}
              className="rounded-xl bg-white p-10 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="mx-auto flex h-[6.5rem] w-[6.5rem] -translate-y-20 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-400/40 print-bg-color print-shadow">
              <svg
                  viewBox="0 0 33 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white print-svg-color"
                >
                  <path
                    d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-gray-800 text-[1.65rem] mb-3 text-xl font-semibold lg:px-14">
                Employment Contracts
              </h1>
              <p className="px-4 text-[1.5rem] text-gray-600">
              Store copies of your contracts that detail your salary (If any).
              </p>
            </div>
            </div>
            {/* Partition */}
            <div className="h-full w-full  pt-[6rem] p-8" id='Card-Partition'>
            <div className="grid gap-14 md:grid-cols-2 md:gap-7">
            {/* Card 3 */}
            <div
              data-aos-delay={300}
              className="rounded-xl bg-white p-10 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="mx-auto flex h-[6.5rem] w-[6.5rem] -translate-y-20 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-400/40 print-bg-color print-shadow">
                <svg
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white print-svg-color"
                >
                  <path
                    d="M60 6.1225V7.5H59.7475L53.7475 21.8725L50.625 16.4975L56.25 2.4975H52.5L46.25 17.5L43.125 12.125L49.5 2.4975H45L39.625 12.1225L36.4975 6.7475L41.25 0H0V7.5H1.875C4.25 7.5 6.25 9.4975 6.25 12.5C6.25 15.5025 4.25 17.5 1.875 17.5H0V60H60V6.1225ZM52.5 57.5H7.5V45H52.5V57.5ZM52.5 42.5H7.5V30H52.5V42.5ZM52.5 27.5H7.5V21.25H52.5V27.5ZM7.5 12.5C7.5 10.8725 6.2525 9.4975 4.375 9.4975H2.5V15H4.375C6.2525 15 7.5 13.6275 7.5 12.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-gray-800 mb-3 text-[1.65rem] font-semibold lg:px-14">
                Appraisal Letters
              </h1>
              <p className="px-4 text-gray-600 text-[1.5rem]">
              Collect letters from your employer about salary increases or promotions. (If any).
              </p>
            </div>
            {/* Card 4 */}
            <div className="rounded-xl bg-white p-10 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mx-auto flex h-[6.5rem] w-[6.5rem] -translate-y-20 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-400/40 print-bg-color print-shadow">
                <svg
                  viewBox="0 0 33 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white print-svg-color"
                >
                  <path
                    d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-gray-800 mb-3 text-[1.65rem] font-semibold lg:px-14">
                W2 Document
              </h1>
              <p className="px-4 text-[1.5rem] text-gray-600">
              Collect your W2 for the last three years
              </p>
            </div>
            </div>
          </div>
        </div>
        </div>

        

        <div
          className="flex flex-col justify-center items-center p-[1rem] pb-[2rem] mt-[1rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem]"
          id="SourceLinks"
        >
            <div className="mb-[2rem] mt-[2rem]">
            <h2 className="text-[1.65rem] font-semibold">Source Links</h2>
          </div>
          <SourceLinks />
        </div>

        <div
          className="flex flex-col justify-center items-center pb-[2rem] mt-[2rem] ml-[5rem] bg-white shadow-lg rounded-lg w-[93rem] mb-[2rem]"
          id="FAQ"
        >
          <div className="mb-[2rem] mt-[2rem]">
            <h2 className="text-[1.65rem] font-semibold">FAQs</h2>
          </div>
          <FaqAccordion />
        </div>

        {/* Print Button ------------------------------------------------------------ */}
        <div className="mt-12 flex justify-center" id="Print-btn">
          <div className="bg-white shadow-lg rounded-lg p-10 w-full md:w-1/2">
            <button
              className="uppercase text-[1.5rem] font-bold tracking-wide bg-blue-900 text-gray-100 p-4 rounded-lg w-full hover:bg-blue-800
                focus:outline-none focus:shadow-outline"
              onClick={handlePrint}
            >
              Print Report
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResultPage