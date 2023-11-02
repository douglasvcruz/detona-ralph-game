const state = {
  view: {
    squares: document.querySelectorAll(".squares"),
    enemy: document.querySelector("enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    life: document.querySelector("#life"),
    gameOver: document.querySelector(".game-over"),
    panel: document.querySelector(".panel"),
  },
  values: {
    hitPosition: 0,
    gameVelocity: 500,
    result: 0,
    currentTime: 60,
    actualLife: 3,
  },
  actions: {
    timerId: null,
    countDownTimerId: setInterval(countDown, 1000),
  },
};

const randomSquare = () => {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
  let squareIndex = Math.floor(Math.random() * (state.view.squares.length - 1));
  let randomSquare = state.view.squares[squareIndex];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
};

const moveEnemy = () => {
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
};

const addListenerHitBox = () => {
  state.view.squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result += 1;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        state.values.actualLife > 0 ? (state.values.actualLife -= 1) : null;
        state.view.life.textContent = `x${state.values.actualLife}`;
        playSound("error");
      }
    });
  });
};

function countDown() {
  state.values.currentTime -= 1;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime <= 0 || state.values.actualLife <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.panel.classList.add("none");
    state.view.gameOver.classList.remove("none");
    state.view.gameOver.textContent = "GAME OVER!";
    setTimeout(() => {
      state.view.gameOver.textContent = "SCORE: " + state.values.result;
    }, 1000);
  }
}

function playSound(sound) {
  let audio = new Audio(`./src/sounds/${sound}.mp3`);
  audio.volume = 0.2;
  audio.play();
}

(function main() {
  moveEnemy();
  addListenerHitBox();
})();
