import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown'

const LoginForm = () => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle1, setJobTitle1] = useState('');
    const [jobTitle2, setJobTitle2] = useState('');
    const [jobTitle3, setJobTitle3] = useState('');
    const [location, setLocation] = useState('');
    const [baseSalary, setBaseSalary] = useState('');
    const [bonusSalary, setBonusSalary] = useState('');
    const [stocks, setStocks] = useState('');
    // const [socCode, setsocCode] = useState('');
    // const [showAdditionalField, setShowAdditionalField] = useState(false);
    // const [code, setCode] = useState('');
    // const [stateValue, setStateValue] = useState('');
    // const [areaValue, setAreaValue] = useState('');
    // const [radioButtonChoice, setRadioButtonChoice] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobTitles = [jobTitle1, jobTitle2, jobTitle3];
    const inputData = { jobTitles, location, baseSalary, bonusSalary, stocks, firstName, lastName, company};

    try {
      // Fetching aggregated salary data for each job title
      const results = await Promise.all(jobTitles.map(async (jobTitle) => {
          const response = await axios.post('https://www.internal.cachelabs.io/api/aggregator/get-aggregated-salary', {
              jobTitle,
              location,
          });

          const parseSalary = (salary) => {
              const parsedSalary = parseInt(salary.replace(/[^\d]/g, ''), 10);
              return isNaN(parsedSalary) ? 0 : parsedSalary;
          };

          return {
              jobTitle,
              highSalaries: {
                  // salaryCom: parseSalary(response.data.salaryCom?.highSalary || '0'),
                  // indeed: parseSalary(response.data.indeed?.highSalary || '0'),
                  talent: parseSalary(response.data.talent?.high || '0'),
                  glassdoor: response.data.glassdoor?.basePayMax ?? 0,
                  // monster: parseSalary(response.data.monster?.high || '0'),
                  // levels: parseSalary(response.data.levels?.high || '0'),
              },
              midSalaries: {
                  // salaryCom: parseSalary(response.data.salaryCom?.averageSalary || '0'),
                  // indeed: parseSalary(response.data.indeed?.averageSalary || '0'),
                  talent: parseSalary(response.data.talent?.mid || '0'),
                  glassdoor: response.data.glassdoor?.basePayMin ?? 0,
                  // monster: parseSalary(response.data.monster?.average || '0'),
                  // levels: parseSalary(response.data.levels?.medianSalary || '0'),
              }
          };
      }));

      // Fetching additional wage data if the additional fields are filled
      // let additionalResponse = null;
      // if (showAdditionalField) {
      //     const res = await axios.post('https://www.internal.cachelabs.io/api/soc/getWageData', {
      //         code,
      //         stateValue,
      //         areaValue,
      //         radioButtonChoice,
      //     });
      //     additionalResponse = res.data;
      // }

      // Navigating to the output page with all the gathered data
      navigate('/rea-result', { state: { inputData, results } });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

  return (
    <>
      <Navbar />
      <div>
        {/* component */}
        <div className="flex justify-center items-cente w-screen h-[88vh] bg-white">
          {/* COMPONENT CODE */}
          <div className="container mx-auto my-4 px-4 ">
            <div className="w-full p-8 my-4 md:px-20 lg:w-9/12 lg:pl-20 lg:pr-40 mx-auto rounded-2xl shadow-2xl">
              <div className="flex">
                <h1 className="font-bold text-5xl">
                  {/* Client Form <br /> */}
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-[2rem]">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    First Name
                  </label>
                  <input
                    className="w-full text-[1.65rem]  bg-gray-100 text-gray-900 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    Last Name
                  </label>
                  <input
                    className="w-full bg-gray-100 text-[1.65rem]  text-gray-900 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
                {/* Company */}
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    Company
                  </label>
                  <input
                    className="w-full bg-gray-100 text-[1.65rem]  text-gray-900 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mt-[2rem]">
                <h1 className="font-bold text-[2rem]">
                  Job Titles <br />
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-[2rem]">
                {/* Job title 1*/}
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    Job Title 1
                  </label>
                  <input
                    className="w-full bg-gray-100 text-[1.65rem]  text-gray-900 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle1}
                    onChange={(e) => setJobTitle1(e.target.value)}
                  />
                </div>
                {/* Job title 2*/}
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    Job Title 2
                  </label>
                  <input
                    className="w-full bg-gray-100 text-[1.65rem]  text-gray-900 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle2}
                    onChange={(e) => setJobTitle2(e.target.value)}
                  />
                </div>
                {/* Job title 3*/}
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    Job Title 3
                  </label>
                  <input
                    className="w-full bg-gray-100 text-[1.65rem]  text-gray-900 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle3}
                    onChange={(e) => setJobTitle3(e.target.value)}
                  />
                </div>
              </div>
              {/* Location */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-[2rem]">
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    Location
                  </label>
                  <input
                    className="w-full bg-gray-100 text-[1.65rem]  text-gray-900 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                {/* SOC Code */}
                </div>
              <div className="flex mt-[2rem]">
                <h1 className="font-bold text-[2rem]">
                  Salary Details <br />
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-[2rem]">
                {/* Base Salary */}
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    Base Salary
                  </label>
                  <div className="relative">
                    <span className="absolute text-[1.65rem]  inset-y-0 left-0 flex pt-2 font-bold items-center pl-3">
                      $
                    </span>
                    <input
                      className="w-full bg-gray-100 text-[1.65rem]  text-gray-900 mt-2 p-[1.25rem] pl-10 rounded-lg focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Base Salary"
                      value={baseSalary}
                      onChange={(e) => setBaseSalary(e.target.value)}
                    />
                  </div>
                </div>
                {/* Bonus Salary */}
                <div>
                  <label className="block text-gray-700 text-[1.65rem]  font-bold ml-2 mb-2">
                    Bonus Salary
                  </label>
                  <div className="relative">
                    <span className="absolute text-[1.65rem]  inset-y-0 left-0 flex pt-2 font-bold items-center pl-3">
                      $
                    </span>
                    <input
                      className="w-full bg-gray-100 text-[1.65rem]  text-gray-900 mt-2 pl-10 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Bonus Salary"
                      value={bonusSalary}
                      onChange={(e) => setBonusSalary(e.target.value)}
                    />
                  </div>
                </div>
                {/* Stocks */}
                <div>
                  <label className="block text-[1.65rem]  text-gray-700 tex font-bold ml-2 mb-2">
                    Stocks
                  </label>
                  <div className="relative">
                    <span className="absolute text-[1.65rem]  inset-y-0 left-0 flex pt-2 font-bold items-center pl-3">
                      $
                    </span>
                    <input
                      className="w-full text-[1.65rem]  bg-gray-100 text-gray-900 mt-2 pl-10 p-[1.25rem] rounded-lg focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Stocks"
                      value={stocks}
                      onChange={(e) => setStocks(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center mt-[2rem] mb-2">
                <input
                  type="checkbox"
                  checked={showAdditionalField}
                  onChange={(e) => setShowAdditionalField(e.target.checked)}
                  className="form-checkbox h-6 w-6 text-blue-600 transition duration-150 ease-in-out"
                />
                <label className="ml-2 text-[1.65rem] font-bold text-gray-900">
                  Include data from SOC Codes for Analysis
                </label>
              </div> */}

              {/* {showAdditionalField && (
                <>
                  <Dropdown
                    stateValue={stateValue}
                    setStateValue={setStateValue}
                    radioButtonChoice={radioButtonChoice}
                    setRadioButtonChoice={setRadioButtonChoice}
                    areaValue={areaValue}
                    setAreaValue={setAreaValue}
                    code={code}
                    setCode={setCode}
                  />
                </>
              )} */}

              <div className="my-2 w-1/2 lg:w-1/4 mt-[3rem]">
                <button
                  className="uppercase text-[1.65rem]  font-bold tracking-wide bg-blue-900 text-gray-100 p-[1rem] rounded-lg w-[20rem] hover:bg-blue-800
                focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
