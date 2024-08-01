import React, { useState } from 'react';
import './LargeCalendar.css'; // Import CSS file

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

// Fake data
const fakeEventsData = [
  { date: new Date(2024, 6, 11), eventName: 'Event 1', description: 'Description of Event 1' },
  { date: new Date(2024, 6, 8), eventName: 'Event 4', description: 'Description of Event 4' },
  { date: new Date(2024, 6, 15), eventName: 'Event 2', description: 'Description of Event 2' },
  { date: new Date(2023, 6, 20), eventName: 'Event 3', description: 'Description of Event 24' },
];

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDays, setSelectedDays] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [events, setEvents] = useState(fakeEventsData);

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  for (let i = 0; i < firstDay; i++) {
    daysArray.unshift(null);
  }

  const handleMouseDown = (day) => {
    if (day) {
      setSelectedDays([day]);
      setIsSelecting(true);
    }
  };

  const handleMouseOver = (day) => {
    if (isSelecting && day) {
      setSelectedDays((prevDays) => {
        if (!prevDays.includes(day)) {
          return [...prevDays, day];
        }
        return prevDays;
      });
    }
  };

  const handleMouseUp = () => {
    if (isSelecting && selectedDays.length > 0) {
      setShowPopup(true);
    }
    setIsSelecting(false);
  };

  const handleClosePopup = () => {
    setSelectedDays([]);
    setShowPopup(false);
  };

  const handleCreateEvent = (event) => {
    event.preventDefault();
    const eventName = event.target.eventName.value;
    const eventContent = event.target.eventContent.value;

    const newEvents = [...events];
    selectedDays.forEach((day) => {
      const eventDate = new Date(year, month, day);
      newEvents.push({ date: eventDate, eventName, description: eventContent });
    });

    setEvents(newEvents);
    handleClosePopup();
  };

  return (
    <div className="calendar">
      <div className="controls">
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </label>
        <label>
          Month:
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('en', { month: 'long' })}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="calendar-grid" onMouseUp={handleMouseUp}>
        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day} className="day">
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          {daysArray.map((day, index) => {
            const dateKey = new Date(year, month, day).toLocaleDateString();
            const dayEvents = events.filter(
              (event) => event.date.toLocaleDateString() === dateKey
            );
            return (
              <div
                key={index}
                className={`day-cell ${selectedDays.includes(day) ? 'selected' : ''}`}
                onMouseDown={() => handleMouseDown(day)}
                onMouseOver={() => handleMouseOver(day)}
                onMouseUp={handleMouseUp}
              >
                {day}
                {dayEvents.length > 0 && (
                  <div className="events">
                    {dayEvents.map((event, idx) => (
                      <div key={idx} className="event">
                        <div className="event-name">{event.eventName}</div>
                        <div className="event-content">{event.description}</div>
                      </div>
                    ))}
                    {dayEvents.length > 2 && <div className="more-events">...</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {showPopup && (
        <Popup
          days={selectedDays.map((day) => new Date(year, month, day))}
          onClose={handleClosePopup}
          onCreateEvent={handleCreateEvent}
        />
      )}
    </div>
  );
};

const Popup = ({ days, onClose, onCreateEvent }) => {
  const formattedDates = days.map((day) => day.toLocaleDateString());
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Selected Dates</h2>
        <ul>
          {formattedDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
        <p>Current Time: {currentTime}</p>
        <form onSubmit={onCreateEvent}>
          <label>
            Event Name:
            <input type="text" name="eventName" required />
          </label>
          <label>
            Event Content:
            <input type="text" name="eventContent" required />
          </label>
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default Calendar;