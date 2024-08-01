import React, { useState } from 'react';
import SmallCalendar from './SmallCalendar';
import LargeCalendar from './LargeCalendar';
import { initialCalendarData } from './mockData';
import './App.css';

function App() {
  const [calendarData, setCalendarData] = useState(initialCalendarData);

  return (
    <div className="app">
      <div className="left-column">
        <SmallCalendar 
          events={calendarData.events} 
          currentDate={new Date(calendarData.currentYear, calendarData.currentMonth, 1)}
        />
      </div>
      <div className="right-column">
        <LargeCalendar 
          events={calendarData.events}
          currentMonth={calendarData.currentMonth}
          currentYear={calendarData.currentYear}
        />
      </div>
    </div>
  );
}

export default App;