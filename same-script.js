function formatTime(totalSecond) {
  let hour = String(parseInt(totalSecond / 3600)).padStart(2, "0");
  let minute = String(parseInt((totalSecond % 3600) / 60)).padStart(2, "0");
  let second = String(parseInt(totalSecond % 60)).padStart(2, "0");
  return `${hour}:${minute}:${second}`;
}
