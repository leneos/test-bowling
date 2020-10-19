import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRounds,
  updateScore,
  selectCurrentRound,
  selectCurrentTry,
} from "../../../redux/appSlice.js";
import { Button } from "../Button/Button.js";
import "./Input.js";
export const Input = (props) => {
  const input = useRef(null);
  const [inputValue, setInputValue] = useState(0);
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
    if (input.current.value.length > 0) {
      dispatch(updateScore(Number(inputValue)));
      maxValue = 10;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        hadleSubmit(e);
        input.current.value = "";
      }}
    >
      <div className="input-group mb-3">
        <input
          ref={input}
          onChange={(e) => {
            handleInput(e);
          }}
          disabled={props.disabled}
          min={minValue}
          max={maxValue}
          defaultValue=""
          type="number"
          className="form-control"
          placeholder="Number of pins hit"
        />
        <div className="input-group-append">
          <Button
            className="btn btn-primary"
            type="submit"
            disabled={props.disabled}
            btnTitle="Submit"
          />
        </div>
      </div>
    </form>
  );
};
