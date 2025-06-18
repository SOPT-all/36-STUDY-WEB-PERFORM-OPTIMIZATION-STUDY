export const isStoreOpen = (openingHours: string): boolean => {
  const [start, end] = openingHours.split('~');
  if (!start || !end) return true;

  const now = new Date();
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);

  const startTime = new Date(now);
  startTime.setHours(startHour, startMin, 0, 0);

  const endTime = new Date(now);
  endTime.setHours(endHour, endMin, 0, 0);

  return now >= startTime && now <= endTime;
};
