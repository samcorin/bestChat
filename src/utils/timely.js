
// Friday, 7 Jul
export const humanReadable = (unix) => {
  const newDate = new Date(unix);
  const el = newDate.toDateString().split(' ');
  console.log("humanReadable: ", )

  return `${el[0]}, ${el[2].replace(/^0+/, '')} ${el[1]}`;
}

// remove leading 0s
// .replace(/^0+/, '')

// export const dateCheck = (unix) => {
//   const newDate = new Date(unix);
//   const el = newDate.toDateString().split(' ');
//   return `${el[0]}, ${el[2]} ${el[1]}`;
// }

// export const beforeToday = (time) => {

// }


export const timely = (time) => {
  const timeObj = new Date(time);
  const minutes = timeObj.getMinutes();
  const convertMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const hour = timeObj.getHours();
  const convertHour = hour > 12 ? hour % 12 : hour;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  return `${convertHour}:${convertMinutes} ${ampm}`;
}

export default timely;
