// mockData.js
export const mockEvents = [
  {
    id: '1',
    title: 'First Session with Alex Stan',
    startTime: new Date(2021, 3, 4, 9, 0), // April 4, 2021, 9:00 AM
    endTime: new Date(2021, 3, 4, 9, 30),
    type: 'appointment',
    clientName: 'Alex Stan',
    clientProfileUrl: '/client/alex-stan',
  },
  {
    id: '2',
    title: 'Webinar: How to cope with trauma in professional life',
    startTime: new Date(2021, 3, 4, 9, 0),
    endTime: new Date(2021, 3, 4, 9, 30),
    type: 'event',
    description: 'Learn strategies to cope with workplace trauma',
  },
  // Thêm các sự kiện khác...
];

export const initialCalendarData = {
  events: mockEvents,
  currentMonth: 3, // April (0-indexed)
  currentYear: 2021,
};