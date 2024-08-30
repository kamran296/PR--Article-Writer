import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const ReaForm = () => {

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
    const [socCode, setsocCode] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const jobTitles = [jobTitle1, jobTitle2, jobTitle3];
        const inputData = { jobTitles, location, baseSalary, bonusSalary, stocks, firstName, lastName, company, socCode};

        try {
            const results = await Promise.all(jobTitles.map(async (jobTitle) => {
                const response = await axios.post('http://localhost:5000/api/aggregator/get-aggregated-salary', {
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
                        salaryCom: parseSalary(response.data.salaryCom?.highSalary || '0'),
                        indeed: parseSalary(response.data.indeed?.highSalary || '0'),
                        talent: parseSalary(response.data.talent?.high || '0'),
                    },
                    midSalaries: {
                        salaryCom: parseSalary(response.data.salaryCom?.averageSalary || '0'),
                        indeed: parseSalary(response.data.indeed?.averageSalary || '0'),
                        talent: parseSalary(response.data.talent?.mid || '0'),
                    }
                };
            }));

            navigate('/report', { state: { inputData, results } });
        } catch (error) {
            console.error('Error fetching salary data:', error);
        }
    };

  return (
    <>
      <Navbar />
      <div>
        {/* component */}
        <div className="flex justify-center items-center w-screen h-[88vh] bg-white">
          {/* COMPONENT CODE */}
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mx-auto rounded-2xl shadow-2xl">
              <div className="flex">
                <h1 className="font-bold text-5xl">
                  {/* Client Form <br /> */}
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-5">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    First Name
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    Last Name
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
                {/* Company */}
                <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    Company
                  </label>
                    <input
                      className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
              </div>

              <div className="flex mt-5">
                <h1 className="font-bold text-2xl">
                  Job Titles <br />
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-5">
                {/* Job title 1*/}
                <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    Job Title 1
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle1}
                    onChange={(e) => setJobTitle1(e.target.value)}
                  />
                </div>
                {/* Job title 2*/}
                <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    Job Title 2
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle2}
                    onChange={(e) => setJobTitle2(e.target.value)}
                  />
                </div>
                {/* Job title 3*/}
                <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    Job Title 3
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle3}
                    onChange={(e) => setJobTitle3(e.target.value)}
                  />
                </div>
              </div>
              {/* Location */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    Location
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                {/* SOC Code */}
                <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    SOC code
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="SOC code"
                    value={socCode}
                    onChange={(e) => setsocCode(e.target.value)}
                  />
                </div>
                </div>
              <div className="flex mt-5">
                <h1 className="font-bold text-2xl">
                  Salary Details <br />
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-5">
                {/* Base Salary */}
                <div>
                  <label className="block text-gray-700 font-bold ml-2 mb-2">
                    Base Salary
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex pt-2 font-bold items-center pl-3">
                      $
                    </span>
                    <input
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 pl-8 rounded-lg focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Base Salary"
                      value={baseSalary}
                      onChange={(e) => setBaseSalary(e.target.value)}
                    />
                  </div>
                </div>
                {/* Bonus Salary */}
                <div>
                  <label className="block text-gray-700 font-bold ml-2 mb-2">
                    Bonus Salary
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex pt-2 font-bold items-center pl-3">
                      $
                    </span>
                    <input
                      className="w-full bg-gray-100 text-gray-900 mt-2 pl-8 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Bonus Salary"
                      value={bonusSalary}
                      onChange={(e) => setBonusSalary(e.target.value)}
                    />
                  </div>
                </div>
                {/* Stocks */}
                <div>
                  <label className="block text-gray-700 tex font-bold ml-2 mb-2">
                    Stocks
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex pt-2 font-bold items-center pl-3">
                      $
                    </span>
                    <input
                      className="w-full bg-gray-100 text-gray-900 mt-2 pl-8 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Stocks"
                      value={stocks}
                      onChange={(e) => setStocks(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="my-2 w-1/2 lg:w-1/4 mt-7">
                <button
                  className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full hover:bg-blue-800
                focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit}
                >
                  Generate 
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* {error && <p style={{ color: "red" }}>Error: {error}</p>}

        <div className='flex justify-center mb-[5rem]'>
          {results && (
            <div className='bg-white shadow-2xl rounded-lg p-6 w-[26rem]'>
              <strong>Results from Salary.com:</strong>
              <p>
                <h2>High Salary:</h2> $
                {results.salaryCom.highSalary.toLocaleString()}
              </p>
              <p>
                {compareSalaries(
                  parseInt(baseSalary, 10),
                  parseInt(bonus, 10),
                  parseInt(stocks, 10),
                  results.salaryCom.highSalary
                )}
              </p>

              <strong>Results from Indeed:</strong>
              <p>
                <h2>High Salary:</h2> $
                {results.indeed.highSalary.toLocaleString()}
              </p>
              <p>
                {compareSalaries(
                  parseInt(baseSalary, 10),
                  parseInt(bonus, 10),
                  parseInt(stocks, 10),
                  results.indeed.highSalary
                )}
              </p>

              <strong>Results from Talent.com:</strong>
              <p>
                <h2>High Salary:</h2> $
                {results.talent.high.toLocaleString()}
              </p>
              <p>
                {compareSalaries(
                  parseInt(baseSalary, 10),
                  parseInt(bonus, 10),
                  parseInt(stocks, 10),
                  results.talent.high
                )}
              </p>
            </div>
          )}
        </div> */}
      </div>
    </>
  );
}

export default ReaForm