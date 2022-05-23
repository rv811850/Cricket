import React, { useState } from "react";
import vs from "./vs.png";
import "./Head.css";

function Header(props) {
  const width = window.innerWidth;
  const [team1, setTeam1] = useState(() => false);
  const [team2, setTeam2] = useState(() => false);
  return (
    <div id="head__watch">
      <div id="head__topBar">
        <div id="head__teamName1">
          <button onClick={() => setTeam1(!team1)}>
            {width <= 600
              ? props.teamName[0].substring(0, 6)
              : props.teamName[0]}
          </button>
        </div>

        <img src={vs} alt="v/s" />

        <div id="head__teamName2">
          <button onClick={() => setTeam2(!team2)}>
            {width <= 600
              ? props.teamName[1].substring(0, 6)
              : props.teamName[1]}
          </button>
        </div>
      </div>
      <h3 id="tossDetail">
        {props.tossWon} choose to {props.choose} first / {props.totalOver} overs
        match
      </h3>
      {team1 && (
        <div id="head__team1Players">
          <h3>{props.teamName[0]}</h3>
          {props.team1.map((p, index) => (
            <span key={index}>
              <span>{p}</span>
              {index === 0 && <span>&nbsp;(c)</span>}
              <span>,&ensp;</span>
            </span>
          ))}
        </div>
      )}

      {team2 && (
        <div id="head__team2Players">
          <h3>{props.teamName[1]}</h3>
          {props.team2.map((p, index) => (
            <span key={index}>
              <span>{p}</span>
              {index === 0 && <span>&nbsp;(c)</span>}
              <span>,&ensp;</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
