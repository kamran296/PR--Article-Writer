import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BellCurve = ({ labels }) => {
  const data = {
    labels: ['Start', 'Middle', 'End', 'Extended'], // x-axis labels
    datasets: [
      {
        label: 'Bell Curve',
        data: [0.1, 1, 0.3, 0.2], // y-axis data points
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    elements: {
      point: {
        pointStyle: 'circle', // Circle points
      },
    },
  };

  const [lowLabel, highLabel] = labels[2] < labels[0] 
    ? [{ label: 'Base', value: labels[2] }, { label: <>{'90'}<sup>th</sup>{' Percentile'}</>, value: labels[0] }]
    : [{ label: <>{'90'}<sup>th</sup>{' percentile'}</>, value: labels[0] }, { label: 'Base', value: labels[2] }];


  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={data} options={options} />
      <div
        style={{
          position: "relative",
          top: "-220px",
          left: "25px",
          textAlign: "center",
        }}
      >
        {labels && labels.length > 0 && (
          <>
            <div
              className="flex flex-col"
              style={{ position: "absolute", left: "20%", top: "-20px" }}
            >
              <div> Median</div>
              <div>${labels[1]}</div>
            </div>
            <div
              className="flex flex-col"
              style={{ position: "absolute", left: "56%", top: "115px" }}
            >
              <div> {lowLabel.label}</div>
              <div>${lowLabel.value}</div>
            </div>
            <div
              className="flex flex-col w-[8rem]"
              style={{ position: "absolute", left: "78%", top: "130px" }}
            >
              <div> {highLabel.label}</div>
              <div>${highLabel.value}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BellCurve;
