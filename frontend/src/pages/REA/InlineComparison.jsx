import React from 'react';

const InlineComparison = ({ baseSalary, bonus, stocks, highSalary }) => {
  // Calculate the margins
  const baseMargin = baseSalary - highSalary;
  const bonusMargin = baseSalary + bonus - highSalary;
  const totalMargin = baseSalary + bonus + stocks - highSalary;

  // Helper function to render the comparison
  const renderComparison = (margin, isBase = false) => {
    const isPositive = margin >= 0;

    // Check for the specific condition where the base salary is within $5,000 more or less than the high salary
    const isWithinRange = isBase && Math.abs(margin) <= 5000;

    let textColor = isPositive ? 'text-green-500' : 'text-red-500';
    if (isWithinRange) {
      textColor = 'text-yellow-500';
    }

    return (
      <span className="font-medium">
        <span className={textColor}>${Math.abs(margin).toLocaleString()}</span>{' '}
        <span >
          {isWithinRange ? 'within range' : isPositive ? 'above' : 'below'}
        </span>{' '}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className='text-[1.65rem]'>Base Salary is {renderComparison(baseMargin, true)} the 90<sup>th</sup> percentile Salary</div>
      <div className='text-[1.65rem]'>Base + Bonus is {renderComparison(bonusMargin)} the 90<sup>th</sup> percentile Salary</div>
      <div className='text-[1.65rem]'>Total (Base + Bonus + Stocks) is {renderComparison(totalMargin)} the 90<sup>th</sup> percentile Salary</div>
    </div>
  );
};

export default InlineComparison;


{/* <div className="space-y-4">
      <div className='text-lg'>Base Salary is {renderComparison(baseMargin)} the 90<sup>th</sup> percentile Salary</div>
      <div className='text-lg'>Base + Bonus is {renderComparison(bonusMargin)} the 90<sup>th</sup> percentile Salary</div>
      <div className='text-lg'>Total (Base + Bonus + Stocks) is {renderComparison(totalMargin)} the 90<sup>th</sup> percentile Salary</div>
    </div> */}

