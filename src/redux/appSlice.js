import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalScore: 0,
  currentRound: 0,
  currentTry: 0,

  isGameStarted: false,
  isGameFinished: false,

  roundsScore: [],
  game: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],

  screenImgs: {
    screen:
      "https://64.media.tumblr.com/00abaf0f7228fbf6d08fb6842f66afe9/tumblr_mlbsc0opzQ1s76yhso1_400.gifv",
    startGameScreen:
      "https://64.media.tumblr.com/00abaf0f7228fbf6d08fb6842f66afe9/tumblr_mlbsc0opzQ1s76yhso1_400.gifv",
    startScreen:
      "https://media1.giphy.com/media/yoJC2ElACT9uejhvYk/giphy.gif?cid=ecf05e475ynjcttqvmlfq24rxbly5jwac48wampi370fib8y&rid=giphy.gif",

    // "https://media1.tenor.com/images/7c816cd4033728ed516000d06c12be84/tenor.gif?itemid=12665775",
    zeroPinsScreen:
      "https://media1.giphy.com/media/yoJC2ElACT9uejhvYk/giphy.gif?cid=ecf05e475ynjcttqvmlfq24rxbly5jwac48wampi370fib8y&rid=giphy.gif",

    strikeScreen:
      "https://media.tenor.com/images/0c34de91b70c433208aa14a876b36b3e/tenor.gif",
    spareScreen:
      "https://media.tenor.com/images/52b059881a9b4f0a0ea56b14e3e23502/tenor.gif",
    normalHit:
      "https://media.tenor.com/images/bfaee0989de31cc62a2d19d9722c8afc/tenor.gif",
  },
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameStarted = !state.isGameStarted;
    },
    restartGame: (state) => initialState,
    updateScore: (state, action) => {
      updateGameScreen(state, action);
      updateRoundScore(state, action);
      updateHitBox(state, action);
    },
  },
});
const updateGameScreen = (state, action) => {
  const hitPins = action.payload;
  if (hitPins === 10) {
    state.screenImgs.screen = state.screenImgs.strikeScreen;
  } else if (hitPins === 0) {
    state.screenImgs.screen = state.screenImgs.zeroPinsScreen;
  } else if (hitPins > 0 && hitPins < 9) {
    state.screenImgs.screen = state.screenImgs.normalHit;
  } else if (
    state.currentTry > 0 &&
    state.game[state.currentRound].firstTry + hitPins === 10
  ) {
    state.screenImgs.screen = state.screenImgs.spareScreen;
  }
};
const updateRoundScore = (state, action) => {
  const { currentRound, currentTry, roundsScore, game } = state;
  const hitPins = action.payload;
  const currentRoundFirstHit = state.game[currentRound].firstTry;
  if (currentRound < 9) {
    if (
      currentRound === 0 &&
      currentTry === 1 &&
      currentRoundFirstHit + hitPins !== 10 &&
      currentRoundFirstHit !== 10
    ) {
      roundsScore.push(hitPins + currentRoundFirstHit);
    } else if (
      currentTry === 1 &&
      currentRoundFirstHit + hitPins !== 10 &&
      game[currentRound - 1].firstTry !== 10
    ) {
      if (currentRound === 0) {
        roundsScore.push(hitPins + currentRoundFirstHit);
      } else {
        roundsScore.push(
          hitPins + currentRoundFirstHit + roundsScore[currentRound - 1]
        );
      }
    } else if (
      currentRound > 0 &&
      currentTry === 1 &&
      game[currentRound - 1].firstTry === 10 &&
      game[currentRound].firstTry + hitPins !== 10
    ) {
      if (currentRound === 1) {
        roundsScore.splice(
          currentRound - 1,
          0,
          10 + game[currentRound].firstTry + hitPins
        );
        roundsScore.push(
          game[currentRound].firstTry + hitPins + roundsScore[currentRound - 1]
        );
      } else {
        roundsScore.splice(
          currentRound - 1,
          0,
          10 +
            game[currentRound].firstTry +
            hitPins +
            roundsScore[currentRound - 2]
        );
        roundsScore.push(
          game[currentRound].firstTry + hitPins + roundsScore[currentRound - 1]
        );
      }
    } else if (
      currentRound > 1 &&
      game[currentRound - 2].firstTry === 10 &&
      game[currentRound - 1].firstTry === 10
    ) {
      if (currentRound === 2) {
        roundsScore.splice(
          currentRound - 2,
          0,
          10 + game[currentRound - 1].firstTry + hitPins
        );
      } else {
        roundsScore.splice(
          currentRound - 2,
          0,
          10 +
            game[currentRound - 1].firstTry +
            hitPins +
            roundsScore[currentRound - 3]
        );
      }
    } else if (
      currentRound > 1 &&
      game[currentRound - 1].firstTry === 10 &&
      game[currentRound].firstTry + hitPins === 10
    ) {
      roundsScore.splice(
        currentRound - 1,
        0,
        10 +
          game[currentRound].firstTry +
          hitPins +
          roundsScore[currentRound - 2]
      );
    } else if (
      currentRound > 0 &&
      currentTry === 0 &&
      game[currentRound - 1].firstTry + game[currentRound - 1].secondTry === 10
    ) {
      if (currentRound === 1) {
        roundsScore.splice(currentRound - 1, 0, 10 + hitPins);
      } else {
        roundsScore.splice(
          currentRound - 1,
          0,
          10 + hitPins + roundsScore[currentRound - 2]
        );
      }
    } else if (currentTry === 1 && currentRoundFirstHit + hitPins !== 10) {
      roundsScore.push(
        currentRoundFirstHit + hitPins + roundsScore[currentRound - 1]
      );
    }
  } else if (currentRound === 9) {
    if (game[currentRound - 2].firstTry === 10 && currentTry === 0) {
      roundsScore.splice(
        currentRound - 2,
        0,
        10 +
          game[currentRound - 1].firstTry +
          hitPins +
          roundsScore[currentRound - 3]
      );
    } else if (game[currentRound - 1].firstTry === 10 && currentTry === 1) {
      roundsScore.splice(
        currentRound - 1,
        0,
        10 +
          game[currentRound].firstTry +
          hitPins +
          roundsScore[currentRound - 2]
      );
    } else if (game[currentRound].firstTry === 10 && currentTry === 2) {
      roundsScore.push(
        10 +
          game[currentRound].firstTry +
          hitPins +
          roundsScore[currentRound - 1]
      );
    } else if (
      currentTry === 0 &&
      game[currentRound - 1].firstTry + game[currentRound - 1].secondTry === 10
    ) {
      roundsScore.splice(
        currentRound - 1,
        0,
        10 + hitPins + roundsScore[currentRound - 2]
      );
    } else if (
      currentTry === 1 &&
      game[currentRound].firstTry + game[currentRound.secondTry] !== 10
    ) {
      roundsScore.push(
        game[currentRound].firstTry + hitPins + roundsScore[currentRound - 1]
      );
    }
  }
};
const updateHitBox = (state, action) => {
  const hitPins = action.payload;
  if (state.currentRound < 9) {
    if (state.currentTry === 0) {
      if (hitPins === 10) {
        state.game[state.currentRound].firstTry = hitPins;
        state.currentTry = 0;
        state.currentRound += 1;
      } else {
        state.game[state.currentRound].firstTry = hitPins;
        state.currentTry = 1;
      }
    } else if (
      state.currentRound === 1 &&
      state.game[state.currentRound].firstTry + hitPins === 10
    ) {
      state.game[state.currentRound].secondTry = hitPins;
      state.currentTry = 0;
      state.currentRound += 1;
    } else {
      state.game[state.currentRound].secondTry = hitPins;
      state.currentTry = 0;
      state.currentRound += 1;
    }
  } else if (state.currentRound === 9) {
    if (state.currentTry === 0) {
      state.game[state.currentRound].firstTry = hitPins;
      state.currentTry = 1;
    } else if (state.currentTry === 1) {
      state.game[state.currentRound].secondTry = hitPins;
      if (
        state.game[state.currentRound].firstTry + hitPins === 10 ||
        state.game[state.currentRound].firstTry === 10
      ) {
        state.currentTry = 2;
      } else {
        state.isGameFinished = true;
      }
    } else if (state.currentTry === 2) {
      state.game[state.currentRound].thirdTry = hitPins;
      state.isGameFinished = true;
    }
  }
};
export const { startGame, updateScore, restartGame } = appSlice.actions;

export const selectIsGameStarted = (redux) => redux.app.isGameStarted;
export const selectIsGameFinished = (redux) => redux.app.isGameFinished;
export const selectRounds = (redux) => redux.app.game;
export const selectCurrentRound = (redux) => redux.app.currentRound;
export const selectScreenImgs = (redux) => redux.app.screenImgs;
export const selectCurrentTry = (redux) => redux.app.currentTry;
export const selectRoundScore = (redux) => redux.app.roundsScore;

export default appSlice.reducer;
