import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import Card from './Card';

const SignalGraph = () => {
  const [speedData, setSpeedData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    generateSpeedData();
    generateTempData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45',"14:00", "14:15","14:30", "14:45", "15:00","15:15","15:30","15:45","17:00",""], // Example time labels
          datasets: [
            {
              label: 'Speed',
              data: speedData,
              borderColor: 'blue',
              backgroundColor: 'transparent',
              yAxisID: 'y-axis',
              tension: 0.2,
            },
            {
              label: 'Temperature',
              data: tempData,
              borderColor: 'red',
              backgroundColor: 'transparent',
              yAxisID: 'y-axis',
              tension: 0.4,
            },
          ],
        },
        options: {
          scales: {
            x: {
              position: 'bottom',
            },
            y: {
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Speed/Temperature',
              },
            },
          },
        },
      });
    }
  }, [speedData, tempData]);

  const generateSpeedData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push(Math.random() * 50); // Random speed values
    }
    setSpeedData(data);
  };

  const generateTempData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push(Math.random() * 30); // Random temperature values
    }
    setTempData(data);
  };

  return (
    <div className="signal-graph-container" style={{ width: '600px', height: '400px' }}>
      <Card>



      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
      </Card>
    </div>
  );
};

export default SignalGraph;
