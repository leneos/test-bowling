import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentRound } from "../../redux/appSlice";
import "./ScoreBox.scss";
export const ScoreBox = ({ gameInfo, roundScore, index }) => {
  const { firstTry, secondTry } = gameInfo;
  const currentRound = useSelector(selectCurrentRound);
  return (
    <div className="ScoreBox">
      <div className="tries">
        <div className="firstTry try">
          <p>{firstTry === 10 ? `X` : firstTry}</p>
        </div>
        <div className="secondTry try">
          <p>
            {currentRound === 9 && secondTry === 10
              ? `X`
              : secondTry + firstTry === 10
              ? `/`
              : secondTry}
          </p>
        </div>
        {index === 9 ? (
          <div className="thirdTry try">
            {currentRound === 9 && gameInfo.thirdTry === 10
              ? `X`
              : secondTry + gameInfo.thirdTry === 10
              ? `/`
              : gameInfo.thirdTry}
          </div>
        ) : null}
      </div>
      <p>{roundScore > -1 ? roundScore : null}</p>
    </div>
  );
};
