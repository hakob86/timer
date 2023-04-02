const inputEl = document.querySelector("#seconds");
const buttonEl = document.querySelector("#start");
const timerEl = document.querySelector("#timer");
const resetEl = document.querySelector("#reset");

let intervalID = null;

const createTimerAnimator = () => {
  return (seconds) => {
    const targetTime = new Date().getTime() + seconds * 1000;

    intervalID = setInterval(() => {
      const remainingTime = targetTime - new Date().getTime();

      if (remainingTime <= 0) {
        clearInterval(intervalID);
        timerEl.textContent = "00:00:00";
        return;
      }

      const formatedTime = new Date(remainingTime).toISOString().substr(11, 8);
      timerEl.textContent = formatedTime;
    }, 500);
  };
};

const animateTimer = createTimerAnimator();

const onSubmit = () => {
  clearInterval(intervalID);
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = "";
};

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/\D/g, "");
});

inputEl.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    onSubmit();
  }
});

buttonEl.addEventListener("click", onSubmit);

resetEl.addEventListener("click", () => {
  clearInterval(intervalID);
  timerEl.textContent = "00:00:00";
  inputEl.value = "";
});
