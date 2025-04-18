const selectEl = document.querySelectorAll("select");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const btnEl = document.querySelector(".btn");
let alarmTime,
  alarmState = "noset";
const ringTone = new Audio("./assets/ringtone.mp3");
const contentEl = document.querySelector(".content");

for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let optionEl = `<option value="${i}">${i}</option>`;
  selectEl[0].firstElementChild.insertAdjacentHTML("afterend", optionEl);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let optionEl = `<option value="${i}">${i}</option>`;
  selectEl[1].firstElementChild.insertAdjacentHTML("afterend", optionEl);
}

setInterval(() => {
  let date = new Date();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeEl.innerHTML = `${h}:${m}:${s}`;

  if (alarmTime == `${h}:${m}`) {
    ringTone.play();
    ringTone.loop = true;
    console.log("ring tone");
  }
}, 1000);

setInterval(() => {
  let Alldate = new Date();

  let day = Alldate.getDate();
  let month = Alldate.getMonth() + 1;
  let year = Alldate.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  dateEl.innerHTML = `${year}.${month}.${day}`;
}, 1000);

btnEl.addEventListener("click", () => {
  alarmTime = `${selectEl[0].value}:${selectEl[1].value}`;
  if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
    return alert("Please Set correct Alarm");
  }
  checkState(alarmState);
  console.log("click");
});

function checkState(state) {
  if (state == "noset") {
    btnEl.innerText = "Clear Alarm";
    contentEl.classList.add("disable");
    alarmState = "set";
  } else {
    btnEl.innerText = "Set Alarm";
    contentEl.classList.remove("disable");
    ringTone.pause();
    alarmState = "noset";
    alarmTime = "";
  }
}
