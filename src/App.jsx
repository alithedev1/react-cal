import React, { useState } from 'react';
import './App.css';

const App = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  function getDatesOfCurrentMonth() {
    const firstDayOfMonth = new Date(currentYear, selectedMonth, 1);
    const lastDayOfMonth = new Date(currentYear, selectedMonth + 1, 0);
    const datesArray = [];
    const daysOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) through 6 (Saturday)

    // Add empty cells for the days before the start of the month
    for (let i = 0; i < daysOfWeek; i++) {
      datesArray.push(null);
    }

    // Add the dates of the current month
    for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
      datesArray.push(new Date(date));
    }

    // Calculate how many empty cells are needed at the end to complete 6 rows
    let totalCells;
    if (datesArray.length <= 35) {
      totalCells = 35;
    } else {
      totalCells = 42;
    }
    const remainingEmptyCells = totalCells - datesArray.length;

    // Add empty cells at the end
    for (let i = 0; i < remainingEmptyCells; i++) {
      datesArray.push(null);
    }

    return datesArray;
  }

  const thisMonthDates = getDatesOfCurrentMonth();

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  return (
    <>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {new Date(currentYear, i, 1).toLocaleString('en-US', { month: 'long' })}
          </option>
        ))}
      </select>

      <div className="grid-container">

        {daysOfWeek.map((day, index) => {
          return <div key={index} className="grid-cell">{day}</div>
        })}
        {thisMonthDates.map((date, index) => {
          if (date) {
            return <div key={index} className="grid-cell">{date.getDate()}</div>
          } else {
            return <div key={index} className="grid-cell empty-cell"></div>
          }
        })}
      </div>

    </>

  );
}

export default App;
