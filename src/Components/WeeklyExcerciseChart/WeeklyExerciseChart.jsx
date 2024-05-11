import React from 'react';
import ExerciseChart from '../../ExerciseChart/ExcerciseChart';
import "./WeeklyExcerciseChart.css"
const WeeklyExerciseChart = ({className}) => {
  const data = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '주간 운동 현황',
        data: [20, 30, 40, 50, 60, 70, 80], // 예시 데이터, 실제로는 사용자의 운동 데이터를 사용해야 합니다.
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
  
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    scales: {
      x: {
        ticks: {
          display: false // x축 눈금 숨김
        },
        grid: {
          drawBorder: false, // x축 바깥쪽 테두리 숨김
          display: false // x축 그리드 라인 숨김
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: false // y축 눈금 숨김
        },
        grid: {
          drawBorder: false, // y축 바깥쪽 테두리 숨김
          display: false // y축 그리드 라인 숨김
        }
      },
    },
  };
  

  return <ExerciseChart  data={data} options={options} className={className}/>
};

export default WeeklyExerciseChart;
