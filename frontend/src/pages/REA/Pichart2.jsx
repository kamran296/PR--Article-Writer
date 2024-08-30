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

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, index, name, value }) => {
    const RADIAN = Math.PI / 180;
    const labelRadius = outerRadius + 20; // Move the label outside the pie chart
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    // Line starts at the edge of the pie slice
    const xLineStart = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const yLineStart = cy + outerRadius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        {/* Line from the edge of the pie slice to the label */}
        <line x1={xLineStart} y1={yLineStart} x2={x} y2={y} stroke={COLORS[index % COLORS.length]} strokeWidth={2} />
        {/* Label at the end of the line */}
        <text
          x={x}
          y={y}
          fill={COLORS[index % COLORS.length]}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          style={{ fontSize: '15px' }}
        >
          {`${value}`}
        </text>
      </g>
    );
  };

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
          label={renderCustomizedLabel} // Apply custom label render function
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ fontSize: '15px' }} />
        <Legend wrapperStyle={{ fontSize: '15px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SalaryPieChart;
