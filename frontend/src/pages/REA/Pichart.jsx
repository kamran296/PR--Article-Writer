// src/SalaryPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalaryPieChart = ({ baseSalary, bonusSalary, stocksComponent }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const formattedData = [
    { name: 'Base Salary', value: baseSalary },
    { name: 'Bonus Salary', value: bonusSalary },
    { name: 'Stocks/RSU/others', value: stocksComponent },
  ];

  return (
    <ResponsiveContainer width={350} height={300}>
      <PieChart>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SalaryPieChart;
