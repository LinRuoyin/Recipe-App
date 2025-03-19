const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const countdownTimer = document.querySelector("#countdown-timer");

const hourInput = document.querySelector("#countdown-hour-input");
const minuteInput = document.querySelector("#countdown-minute-input");
const secondInput = document.querySelector("#countdown-second-input");

hourInput.addEventListener("input", (event) => {
  let value = Number(event.target.value);
  if (!Number.isInteger(value)) {
    alert("Please enter an integer.");
    event.target.value = "";
  }
  if (value < 0 || value > 99) {
    alert("Please enter an Integer between 0 to 99.");
    event.target.value = "";
  }
});

function minuteSecondInputLimit(event) {
  let value = Number(event.target.value);
  if (!Number.isInteger(value)) {
    event.target.value = Math.floor(value);
  }
  if (value < 0 || value > 59) {
    alert("Please enter an Integer between 0 to 59.");
    event.target.value = "";
  }
}

minuteInput.addEventListener("input", minuteSecondInputLimit);
secondInput.addEventListener("input", minuteSecondInputLimit);

function formatTime(seconds) {
  const hour = String(parseInt(seconds / 3600)).padStart(2, "0") || 0;
  const minute = String(parseInt((seconds % 3600) / 60)).padStart(2, "0") || 0;
  const second = String(seconds % 60).padStart(2, "0") || 0;

  return `${hour}:${minute}:${second}`;
}

//countdown display as
function countdownDisplay() {
  countdownTimer.innerHTML = formatTime(totalSeconds);
}

//stop the input
function toggleInputs(boolean) {
  hourInput.disabled = boolean;
  minuteInput.disabled = boolean;
  secondInput.disabled = boolean;
}

let timerId = 0;
let totalSeconds = 0;

startButton.addEventListener("click", () => {
  //check if the timer is on
  if (timerId !== 0) return;
  const hour = Number(hourInput.value) || 0;
  const minute = Number(minuteInput.value) || 0;
  const second = Number(secondInput.value) || 0;

  if (hour === 0 && minute === 0 && second == 0) {
    alert("Please enter the time.");
    return;
  }
  totalSeconds = hour * 3600 + minute * 60 + second;
  countdownTimer.innerHTML = formatTime(totalSeconds);

  toggleInputs(true);

  timerId = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(timerId);
      timerId = 0;
      totalSeconds = 0;
      toggleInputs(false);
      countdownTimer.innerHTML = "Time's up!";
      countdownTimer.style.color = "red";
    } else {
      countdownDisplay();
    }
  }, 1000);
  countdownTimer.style.color = "black";
  pauseButton.innerHTML = "Pause";
});

pauseButton.addEventListener("click", () => {
  if (timerId !== 0) {
    clearInterval(timerId);
    timerId = 0;
    pauseButton.innerHTML = "Resume";
  } else {
    if (totalSeconds > 0) {
      timerId = setInterval(() => {
        totalSeconds--;
        pauseButton.innerHTML = "Pause";
        toggleInputs(true);
        if (totalSeconds <= 0) {
          clearInterval(timerId);
          timerId = 0;
          totalSeconds = 0;
          toggleInputs(false);
          countdownTimer.innerHTML = "Time's up!";
          countdownTimer.style.color = "red";
          pauseButton.innerHTML = "Pause";
        } else {
          countdownDisplay();
        }
      }, 1000);
    }
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = 0;
  totalSeconds = 0;
  hourInput.value = "";
  minuteInput.value = "";
  secondInput.value = "";

  countdownTimer.innerHTML = "00:00:00";
  toggleInputs(false);
  pauseButton.innerHTML = "Pause";
  countdownTimer.style.color = "black";
});
