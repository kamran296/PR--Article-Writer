import React, { useState } from 'react';

const SourceLinks = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
      setIsOpen(!isOpen);   
    };

  return (
    <div className="pb-[2rem]">
        {/* <h2
          className="flex justify-between items-center w-full font-semibold p-3 "
        >
          <span className='flex justify-between items-center w-full'>Sourse Links</span>
          </h2> */}
          {/* <svg
            className={`fill-current text-blue-700 h-6 w-6 transform transition-transform duration-500 ${
              isOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.076,8.392c0.235-0.235,0.615-0.235,0.851,0l3.312,3.313l3.312-3.313c0.235-0.235,0.615-0.235,0.851,0C14.198,8.611,14.198,8.892,13.962,8.885z" />
          </svg> */}
        
        {isOpen && (
        <p className="space-y-2 text-[1.5rem]  text-gray-700">
        <span className="block font-semibold text-blue-900">
          indeed.com:{" "}
          <a
            href="https://www.indeed.com/career/salaries"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://www.indeed.com/career/salaries
          </a>
        </span>
        <span className="block font-semibold text-blue-900">
          talent.com:{" "}
          <a
            href="https://www.talent.com/salary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://www.talent.com/salary
          </a>
        </span>
        <span className="block font-semibold text-blue-900">
          Salary.com:{" "}
          <a
            href="https://www.salary.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://www.salary.com/
          </a>
        </span>
      </p>)}
      </div>
  )
}

export default SourceLinks