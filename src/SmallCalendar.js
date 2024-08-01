import React, { Fragment, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import './SmallCalendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import VideocamIcon from '@mui/icons-material/Videocam';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const SmallCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);



 const eventData = {
  '2024-08-04': [
    { title: 'First Session with Alex Stan', time: '9:00 AM - 09:30 AM GMT+8', type: 'session' },
    { title: 'Webinar: How to cope with trauma in professional life', time: '10:00 AM - 11:00 AM GMT+8', type: 'webinar' },
    { title: 'Lunch with Team', time: '12:00 PM - 1:00 PM GMT+8', type: 'meeting' },
  ],
  '2024-08-03': [
    { title: 'Project Meeting', time: '9:00 AM - 10:00 AM GMT+8', type: 'meeting' },
    { title: 'Client Call', time: '11:00 AM - 11:30 AM GMT+8', type: 'call' },
    { title: 'Gym Session', time: '6:00 PM - 7:00 PM GMT+8', type: 'personal' },
  ],
  '2024-08-02': [
    { title: 'Doctor Appointment', time: '8:00 AM - 9:00 AM GMT+8', type: 'personal' },
    { title: 'Team Brainstorming Session', time: '10:00 AM - 12:00 PM GMT+8', type: 'session' },
    { title: 'Dinner with Family', time: '7:00 PM - 9:00 PM GMT+8', type: 'personal' },
  ],
  '2024-08-05': [
    { title: 'Yoga Class', time: '6:00 AM - 7:00 AM GMT+8', type: 'exercise' },
    { title: 'Weekly Review Meeting', time: '10:00 AM - 11:00 AM GMT+8', type: 'meeting' },
    { title: 'Lunch with Client', time: '1:00 PM - 2:00 PM GMT+8', type: 'meeting' },
    { title: 'Read a Book', time: '8:00 PM - 9:00 PM GMT+8', type: 'personal' },
  ],
  // Add more events as needed
};

  const onChange = (newValue) => {
    setSelectedDate(newValue);
    const selectedDate = newValue.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    setEvents(eventData[selectedDate] || []);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const renderEvents = () => {
    const formattedDate = formatDate(selectedDate);
    const events = eventData[formattedDate] || [];

    return events.map((event, index) => (
      <Box
        key={index}
        sx={{
          backgroundColor: event.type === 'session' ? '#E8F1FB' : '#FFF3E0',
          padding: 2,
          marginBottom: 1,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{event.title}</Typography>
          {event.type === 'session' && <VideocamIcon sx={{ color: '#1976D2' }} />}
        </Box>
        <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>{event.time}</Typography>
        {event.type === 'session' && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <AccountCircleIcon sx={{ fontSize: 20, mr: 1, color: '#1976D2' }} />
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
              View Client Profile
            </Typography>
          </Box>
        )}
      </Box>
    ));
  };

  return (
    <Fragment>
      <Calendar onChange={onChange} value={selectedDate} />
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Upcoming Events</Typography>
          <Button variant="contained" color="primary" size="small">View All</Button>
        </Box>
        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
          Today, {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
        </Typography>
        {renderEvents()}
      </Box>
     <div>
        <h3>Events for {selectedDate.toDateString()}:</h3>
        {events.length > 0 ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.title}</strong><br />
                <span>{event.time}</span><br />
                <em>{event.type}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this day.</p>
        )}
      </div>
    </Fragment>
  );
};

export default SmallCalendar;