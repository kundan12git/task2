let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 1;

const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

startStopBtn.addEventListener("click", toggleStartStop);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

function toggleStartStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = "Start";
        lapBtn.disabled = true;
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 100);
        isRunning = true;
        startStopBtn.textContent = "Pause";
        lapBtn.disabled = false;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}
function formatTime(time){
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;

}

function padZero(value) {
    return value < 10 ? "0" + value : value;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 1;
    timeDisplay.textContent = "00:00:00.00";
    lapList.innerHTML = "";
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
}

function recordLap() {
    if(!isRunning) return;
    
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("div");
    lapItem.classList.add("lap");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    
lapCount++;
}