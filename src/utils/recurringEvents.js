// utils/recurringEvents.js
export function generateRecurringEvents(event, startDate, endDate) {
  const events = [];
  let currentDate = new Date(event.startTime);

  while (currentDate <= endDate) {
    if (currentDate >= startDate) {
      events.push({
        ...event,
        startTime: new Date(currentDate),
        endTime: new Date(currentDate.getTime() + (event.endTime - event.startTime)),
      });
    }

    switch (event.recurringPattern.frequency) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + event.recurringPattern.interval);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7 * event.recurringPattern.interval);
        break;
      // Xử lý các trường hợp khác (monthly, yearly)...
    }
  }

  return events;
}