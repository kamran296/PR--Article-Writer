import React, { useState } from 'react';

const FaqAccordion = () => {
    const accordionData = [
        {
          question: 'How is the high salary value for a role being calculated?',
          answer: 'High salary data is aggregated from various trustworthy websites, ensuring that the figures represent competitive compensation across the industry.',
        },
        {
          question: 'What factors are considered in the salary comparison analysis?',
          answer: 'The analysis compares base salary, bonus, and stock options against high salary data. It takes into account industry benchmarks, location, and job title.',
        },
        {
          question: 'How accurate is the salary data used in the analysis?',
          answer: 'The salary data is sourced from reputable websites known for their accurate and up-to-date compensation information. Additionally, the data is processed to ensure it reflects current market trends.',
        },
        {
          question: 'Can I use this analysis to negotiate my salary?',
          answer: 'Yes, the analysis provides insights into whether your current or proposed salary is competitive, helping you to negotiate a better compensation package with confidence.',
        },
        {
          question: 'What should I do if my salary is below the high salary value?',
          answer: 'If your salary is below the high salary value, consider discussing potential adjustments with your employer. You can use the analysis as a reference point in these discussions.',
        },
      ];
      

  const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen(!isOpen);
    };

    return (
      <li className="bg-white text-[1.5rem] my-2 shadow-lg">
        <h2
          onClick={handleClick}
          className="flex justify-between items-center font-semibold p-6 cursor-pointer"
        >
          <span>{question}</span>
          <svg
            className={`fill-current text-blue-700 h-6 w-6 transform transition-transform duration-500 ${
              isOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.076,8.392c0.235-0.235,0.615-0.235,0.851,0l3.312,3.313l3.312-3.313c0.235-0.235,0.615-0.235,0.851,0C14.198,8.611,14.198,8.892,13.962,8.885z" />
          </svg>
        </h2>
        {isOpen && <p className="p-6 text-gray-700">{answer}</p>}
      </li>
    );
  };

  return (
    <div className="w-full max-w-[45rem] mx-auto">
      <ul className="flex flex-col">
        {accordionData.map((item, index) => (
          <AccordionItem key={index} question={item.question} answer={item.answer} />
        ))}
      </ul>
    </div>
  );
};

export default FaqAccordion;
