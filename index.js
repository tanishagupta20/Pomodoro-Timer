let pomoTimer = document.getElementsByClassName("pomo-timer")[0];
pomoTimer.innerHTML = "00:00";

let timerId;
let breakTimerId;
let flag;

let sessionDuration = 25;
let breakDuration = 5;

let sessionTime = document.getElementById("session-set-time");
sessionTime.innerHTML = `${sessionDuration} min`;

let breakTime = document.getElementById("break-set-time");
breakTime.innerHTML = `${breakDuration} min`;

let seconds = 59;
let minutes = sessionDuration - 1;

let decrementSession = document.getElementById("reduce-session-time");
let incrementSession = document.getElementById("increase-session-time");
let decrementBreak = document.getElementById("reduce-break-time");
let incrementBreak = document.getElementById("increase-break-time");

let sessionCount = 1;
let breakCount = 1;

let sessionPomo = document.getElementById("pomo-session");

function incrSessionTime() {
  sessionDuration++;
  minutes++;
  sessionTime.innerHTML = `
  ${sessionDuration} min
  `
}

function incrBreakTime() {
  breakDuration++;
  minutes++;
  breakTime.innerHTML = `
  ${breakDuration} min
  `
}

function decrSessionTime() {
  if (sessionDuration == 0) {
    sessionTime.innerHTML = `
      0 min
    `
  }
  else {
    sessionDuration--;
    minutes--;
    sessionTime.innerHTML = `
      ${sessionDuration} min
    `
  }
}

function decrBreakTime() {
  if (breakDuration == 0) {
    breakTime.innerHTML = `
      0 min
    `
  }
  else {
    minutes--;
    breakDuration--;
    breakTime.innerHTML = `
      ${breakDuration} min
    `
  }
}

function startTimer() {
  let start = document.getElementById("start");
  start.innerHTML = `Pause`;
  start.onclick = pauseTimer;
  decrementSession.disabled = true;
  incrementSession.disabled = true;
  decrementBreak.disabled = true;
  incrementBreak.disabled = true;
  flag = true;
  console.log(sessionDuration, minutes, seconds)
  timerId = setInterval(clock, 1000);
}

function breakTimer() {
  let start = document.getElementById("start");
  start.innerHTML = `Pause`;
  start.onclick = pauseTimer;
  decrementSession.disabled = true;
  incrementSession.disabled = true;
  decrementBreak.disabled = true;
  incrementBreak.disabled = true;
  flag = false;
  breakTimerId = setInterval(clock, 1000);
}

function clock() {
  seconds--;
  document.getElementById("hourglass").style.background = `conic-gradient(#636361 ${(((minutes*60)+seconds)/(sessionDuration*60)*100)}%, #00a0b0 ${(((minutes*60)+seconds)/(sessionDuration*60)*100)}%)`
  if (seconds == 0) {
    minutes--;
    seconds = 59;
  }

  if (minutes == 0 && seconds == 1) {
    if (flag) {
      clearInterval(timerId);
      seconds = 59;
      minutes = breakDuration - 1;
      breakTimer();
      sessionPomo.innerHTML = `Break ${breakCount}`;
      breakCount++;

    }
    else {
      clearInterval(breakTimerId);
      seconds = 59;
      minutes = sessionDuration - 1;
      startTimer();
      sessionCount++;
      sessionPomo.innerHTML = `Session ${sessionCount}`;
    }

  }
  pomoTimer.innerHTML = (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
}

function pauseTimer() {
  clearInterval(breakTimerId);
  clearInterval(timerId);

  let start = document.getElementById("start");
  start.innerHTML = `Start`;

  if (flag) {
    start.onclick = startTimer;
  }
  else {
    start.onclick = breakTimer;
  }
}

function resetTimer() {
  pomoTimer.innerHTML = "00:00";
  seconds = 59;
  minutes = sessionDuration - 1;

  clearInterval(breakTimerId);
  clearInterval(timerId);

  let start = document.getElementById("start");
  start.innerHTML = `Start`;
  start.onclick = startTimer

  decrementSession.disabled = false;
  incrementSession.disabled = false;
  decrementBreak.disabled = false;
  incrementBreak.disabled = false;

  sessionCount = 1;
  breakCount = 1;

  sessionPomo.innerHTML = `Session 1`;
}