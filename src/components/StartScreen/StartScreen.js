import React from "react";
import { Screen } from "../Screen/Screen";
import { Button } from "../UI/Button/Button";
import { selectIsGameStarted, startGame } from "../../redux/appSlice";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const StartScreen = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector(selectIsGameStarted);

  return (
    <div className="StartScreen">
      <div style={{ textAlign: "center" }} className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-xl-12  ">
            <Screen />
            {isGameStarted === false ? (
              <NavLink to="/start">
                <Button
                  className="btn btn-primary mt-4"
                  onClick={() => dispatch(startGame())}
                  btnTitle={"Start Game"}
                />
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
