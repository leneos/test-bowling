import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRounds,
  updateScore,
  selectCurrentRound,
  selectCurrentTry,
} from "../../redux/appSlice";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
export const ScoreForm = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const gameInfo = useSelector(selectRounds);
  const currentRound = useSelector(selectCurrentRound);
  const firstTryScore = gameInfo[currentRound].firstTry;
  const secondTryScore = gameInfo[currentRound].secondTry;
  const curTry = useSelector(selectCurrentTry);

  const minValue = 0;
  let maxValue;

  if (curTry === 0) {
    maxValue = 10;
  } else if (curTry === 1) {
    firstTryScore === 10 ? (maxValue = 10) : (maxValue = 10 - firstTryScore);
  } else if (curTry === 2) {
    secondTryScore === 10 || firstTryScore + secondTryScore === 10
      ? (maxValue = 10)
      : (maxValue = 10 - secondTryScore);
  }

  const handleInput = (e) => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setInputValue(parseInt(value));
  };

  const hadleSubmit = (e) => {
    e.preventDefault();
    if (inputValue > 0) {
      dispatch(updateScore(Number(inputValue)));
      maxValue = 10;
      setInputValue("");
    }
  };

  return (
    <form onSubmit={hadleSubmit}>
      <div className="input-group mb-3">
        <Input
          onChange={handleInput}
          min={minValue}
          max={maxValue}
          value={inputValue}
          type="number"
          className="form-control"
          placeholder="Number of pins hit"
        />
        <div className="input-group-append">
          <Button className="btn btn-primary" type="submit" btnTitle="Submit" />
        </div>
      </div>
    </form>
  );
};
