export const timely = (time) => {
  const timeObj = new Date(time);

  const minutes = timeObj.getMinutes();
  // '0' prepend, there must be a better way
  const convertMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const hour = timeObj.getHours();
  // 12-hour convert
  const convertHour = hour > 12 ? hour % 12 : hour;

  const ampm = hour >= 12 ? 'PM' : 'AM';

  return `${convertHour}:${convertMinutes} ${ampm}`;
}

export default timely;
