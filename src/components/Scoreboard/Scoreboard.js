import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsGameFinished,
  selectRounds,
  selectScreenImgs,
  selectRoundScore,
  restartGame,
} from "../../redux/appSlice";
import { ScoreBox } from "../ScoreBox/ScoreBox";
import { Input } from "../UI/Input/Input";
import { Screen } from "../Screen/Screen";
import "./Scoreboard.scss";
import { Button } from "../UI/Button/Button";
export const Scoreboard = () => {
  const rounds = useSelector(selectRounds);

  const screenImgs = useSelector(selectScreenImgs);
  const isGameFinished = useSelector(selectIsGameFinished);

  const roundScore = useSelector(selectRoundScore);

  const dispatch = useDispatch();

  useEffect(() => {}, []);
  const renderTries = () => {
    return rounds.map((item, index) => {
      return (
        <div
          key={index + Math.floor(Math.random())}
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          {index + 1}
          <ScoreBox
            index={index}
            gameInfo={rounds[index]}
            roundScore={roundScore[index]}
          />
        </div>
      );
    });
  };

  return (
    <div className="row  pt-5">
      <div className="col-xs-12 col-xl-12">
        <Screen src={screenImgs.startScreen} />
        <div className="ScoreBoard justify-content-center d-flex flex-wrap">
          {renderTries()}
        </div>
        {isGameFinished ? (
          <>
            <p>Всего: {roundScore[roundScore.length - 1]}</p>
            <Button
              onClick={() => dispatch(restartGame())}
              btnTitle="Restart Game"
            />
          </>
        ) : (
          <Input />
        )}
      </div>
    </div>
  );
};
