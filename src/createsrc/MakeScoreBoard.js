import React from "react";
import ScoreCard from "./ScoreCard";
import DialogFile from "./DialogFile";
import Button from "@material-ui/core/Button";
import RunButtons from "./RunButtons";
import Inning from "./Inning";
import firebase from "../Firebase";

const db = firebase.firestore();

const Style = {
  container: {
    marginBottom: "1rem",
    float: "right",
    maxWidth: "450px",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  battingContainer: {
    textAlign: "left"
  },
  targetStyle: {
    borderBottom: "2px solid #000",
    lineHeight: "0",
    margin: "2.5rem 5px 2.2rem"
  },
  horizontalLine: {
    background: "#fff",
    padding: "0 10px"
  },
  winStatus: {
    textAlign: "center",
    margin: "1rem 5px"
  }
};
let inningArr=[];
let lastWicketType;
let totalRunPrev;
let prevBowlerIndex;
let winStatus;

// ========================================export============================

export default function MakeScoreBoard(props) {
  React.useEffect(() => {
    let lastWicketType = "Null";
    let totalRunPrev = 0;
    let prevBowlerIndex = -1;
    let winStatus = "";
    inningArr = [
      {
        teamName: "",
        captain: "",
        batsmanArr: [],
        bowlerArr: [],
        prevBalls: [],
        Batsmanorder: 1,
        totalScore: 0,
        totalOver: 0,
        ballOnThisOver: 0,
        wicketArr: [],
        lastSix: "",
        lastWicket: ""
      },
      {
        teamName: "",
        captain: "",
        batsmanArr: [],
        bowlerArr: [],
        prevBalls: [],
        Batsmanorder: 0,
        totalScore: 0,
        totalOver: 0,
        ballOnThisOver: 0,
        wicketArr: [],
        lastSix: "",
        lastWicket: ""
      }
    ];
    inningArr[0].teamName = props.teamName[0];
    inningArr[0].captain = props.captain[0];
    props.team[0].map((name, index) => {
      inningArr[0].batsmanArr.push({
        name,
        four: 0,
        six: 0,
        run: 0,
        ball: 0,
        wicketTaker: "",
        typeOut: "not out",
        id: index,
        order: 12
      });
      inningArr[1].bowlerArr.push({
        name,
        over: 0,
        run: 0,
        ex: 0,
        wicket: 0,
        maiden: 0,
        id: index
      });
      
    });
    inningArr[1].teamName = props.teamName[1];
    inningArr[1].captain = props.captain[1];
    props.team[1].map((name, index) => {
      inningArr[1].batsmanArr.push({
        name: name,
        four: 0,
        six: 0,
        run: 0,
        ball: 0,
        wicketTaker: "",
        typeOut: "not out",
        id: index,
        order: 12
      });
      inningArr[0].bowlerArr.push({
        name: name,
        over: 0,
        run: 0,
        ex: 0,
        wicket: 0,
        maiden: 0,
        id: index
      });
    });
    db.collection("Score-Board")
      .doc(props.id)
      .set({ inning: 0,flag:false }, { merge: true });
    return 0;
  }, []);
  function HandleRunButton(value) {
    if (value[0] === "E") {
      if (inningArr[inning].prevBalls.length === 0) return;
      if (
        inningArr[inning].prevBalls[inningArr[inning].prevBalls.length - 1] !==
          "W" &&
        inningArr[inning].prevBalls[inningArr[inning].prevBalls.length - 1] !==
          "N"
      )
        return;

      let ex = parseInt(value[1], 10);
      inningArr[inning].bowlerArr[bowler.index].run += ex;
      inningArr[inning].totalScore += ex;
      inningArr[inning].prevBalls[inningArr[inning].prevBalls.length - 1] +=
        value[1];
      if (inningArr[0].totalScore < inningArr[1].totalScore) {
        MatchEnd();
        return;
      }
      if (ex % 2) {
        setstrike(swapStrike());
      } else {
        setflagChange((prevState) => !prevState);
      }
      return;
    }
    if (value !== "NB" && value !== "WD") {
      inningArr[inning].ballOnThisOver++;
      let num =
        inningArr[inning].bowlerArr[bowler.index].over +
        (inningArr[inning].ballOnThisOver === 6 ? 0.5 : 0.1);
      inningArr[inning].bowlerArr[bowler.index].over = Number(num.toFixed(1));
      inningArr[inning].batsmanArr[strike.index].ball++;
      if (value[0] === "R") {
        // prevRunOutIndex = strike.index;
        inningArr[inning].prevBalls.push("Wk "+value.substring(0, 2)+" ");
        let run = parseInt(value[1], 10);
        inningArr[inning].totalScore += run;
        inningArr[inning].batsmanArr[strike.index].run += run;
        inningArr[inning].bowlerArr[bowler.index].run += run;
        if (
          (remaningBatsman[inning].length === 0 ||
            (inningArr[inning].totalOver === props.totalOverMatch - 1 &&
              inningArr[inning].ballOnThisOver === 6)) &&
          totalRunPrev === inningArr[inning].totalScore
        ) {
          inningArr[inning].bowlerArr[bowler.index].maiden++;
        }
        setwhoWasOut(-1);
      } else if (value[0] === "K") {
        let type = "C";
        if (value === "KBold") {
          type = "B";
        }
        inningArr[inning].wicketArr.push(`${strike.name} (${type[0]})`);
        lastWicketType = type;
        inningArr[inning].prevBalls.push(`Wk ${type}  ${strike.name}`);
        inningArr[
          inning
        ].lastWicket = `${strike.name} ${type} by ${bowler.name} Ov(${inningArr[inning].totalOver}.${inningArr[inning].ballOnThisOver})`;
        inningArr[inning].batsmanArr[strike.index].typeOut = type;
        inningArr[inning].batsmanArr[strike.index].wicketTaker = bowler.name;
        inningArr[inning].bowlerArr[bowler.index].wicket++;
        if (
          remaningBatsman[inning].length === 0 ||
          (inningArr[inning].totalOver === props.totalOverMatch - 1 &&
            inningArr[inning].ballOnThisOver === 6)
        ) {
          if(inningArr[inning].ballOnThisOver === 6){
            inningArr[inning].totalOver++;
            inningArr[inning].ballOnThisOver=0;
          }
          if (totalRunPrev === inningArr[inning].totalScore) {
            inningArr[inning].bowlerArr[bowler.index].maiden++;
          }
          MatchEnd();
        } else {
          for (let i = 0; i < 2; i++) {
            if (currentBatting[i].index === strike.index) {
              currentBatting.splice(i, 1);
              break;
            }
          }
          setcurrentBatting([...currentBatting]);
        }
      } else {
        let run = parseInt(value, 10);
        inningArr[inning].totalScore += run;
        inningArr[inning].batsmanArr[strike.index].run += run;
        inningArr[inning].bowlerArr[bowler.index].run += run;
        if (run === 6) {
          inningArr[inning].batsmanArr[strike.index].six++;
          inningArr[inning].prevBalls.push(`6 ${strike.name}`);
          inningArr[
            inning
          ].lastSix = `${strike.name} Ov(${inningArr[inning].totalOver}.${inningArr[inning].ballOnThisOver})`;
        } else {
          if (run === 4) {
            inningArr[inning].batsmanArr[strike.index].four++;
          }
          inningArr[inning].prevBalls.push(value);
        }
        if (inningArr[inning].ballOnThisOver === 6) {
          inningArr[inning].prevBalls.push("O");
          inningArr[inning].ballOnThisOver = 0;
          inningArr[inning].totalOver++;
          if (totalRunPrev === inningArr[inning].totalScore) {
            inningArr[inning].bowlerArr[prevBowlerIndex].maiden++;
          }
          if (
            inningArr[0].totalScore < inningArr[1].totalScore ||
            inningArr[inning].totalOver === props.totalOverMatch
          ) {
            MatchEnd();
          } else {
            if (run % 2 === 0) {
              setstrike(swapStrike());
            }
            setbowlerFlag(false);
          }
        } else if (inningArr[0].totalScore < inningArr[1].totalScore) {
          MatchEnd();
        } else if (run % 2) {
          setstrike(swapStrike());
        } else {
          setflagChange(!flagChange);
        }
      }
    } else {
      inningArr[inning].totalScore++;
      inningArr[inning].bowlerArr[bowler.index].run++;
      inningArr[inning].bowlerArr[bowler.index].ex++;
      inningArr[inning].prevBalls.push(value[0]);
      if (inningArr[0].totalScore < inningArr[1].totalScore) {
        MatchEnd();
      } else setflagChange((prevState) => !prevState);
    }
  }
  // ==================================handle who was out========================

  function handleWhoWasOut(index) {
    inningArr[inning].prevBalls[
      inningArr[inning].prevBalls.length - 1
    ] += ` ${inningArr[inning].batsmanArr[index].name}`;
    inningArr[inning].batsmanArr[index].typeOut = "Run Out";
    inningArr[inning].wicketArr.push(
      `${inningArr[inning].batsmanArr[index].name} (R)`
    );
    lastWicketType = "Run Out";
    inningArr[
      inning
    ].lastWicket = `${inningArr[inning].batsmanArr[index].name} runout Ov(${inningArr[inning].totalOver}.${inningArr[inning].ballOnThisOver})`;
    if (
      remaningBatsman[inning].length === 0 ||
      (inningArr[inning].totalOver === props.totalOverMatch - 1 &&
        inningArr[inning].ballOnThisOver === 6)
    ) {
      inningArr[inning].totalOver++;
      inningArr[inning].ballOnThisOver = 0;
      MatchEnd();
    }
    setwhoWasOut(index);
    for (let i = 0; i < 2; i++) {
      if (currentBatting[i].index === index) {
        currentBatting.splice(i, 1);
        break;
      }
    }
    setcurrentBatting([...currentBatting]);
  }
  // ===============swap strike================================

  const swapStrike = () => {
    for (let i = 0; i < 2; i++) {
      if (strike.index !== currentBatting[i].index) {
        return currentBatting[i];
      }
    }
  };

  //======================ger remaining bowler===========================
  const getRemaningBowler = () => {
    const arr = [];
    inningArr[inning].bowlerArr.map((item, index) => {
      if (index !== bowler.index) {
        arr.push({ name: item.name, index });
      }
    });
    return arr;
  };
  //===========================New Bowler =============================
  function handleNewBowler(index) {
    totalRunPrev = inningArr[inning].totalScore;
    prevBowlerIndex = index;
    setbowler({ index, name: inningArr[inning].bowlerArr[index].name });
    setbowlerFlag(true);
  }
  //======================New sTrike =============================
  function handleStrike(index) {
    setstrike({ index: index, name: inningArr[inning].batsmanArr[index].name });
    if (inningArr[inning].ballOnThisOver === 6) {
      if (totalRunPrev === inningArr[inning].totalScore) {
        inningArr[inning].bowlerArr[prevBowlerIndex].maiden++;
      }
      inningArr[inning].prevBalls.push("O");
      inningArr[inning].ballOnThisOver = 0;
      inningArr[inning].totalOver++;
      if (inningArr[inning].totalOver === props.totalOverMatch) {
        // [0, 1] = [1, 0];
        MatchEnd();
      } else setbowlerFlag(false);
    }
  }

  //========================New Batsman =============================

  function handleNewBatsman(index) {
    inningArr[inning].batsmanArr[index].order = ++inningArr[inning]
      .Batsmanorder;
    let copy = [...remaningBatsman];
    for (let i = 0; i < copy[inning].length; i++) {
      if (copy[inning][i].index === index) {
        copy[inning].splice(i, 1);
        break;
      }
    }
    currentBatting.push({
      index: index,
      name: inningArr[inning].batsmanArr[index].name
    });
    setremaningBatsman(copy);
    setcurrentBatting([...currentBatting]);
    if (lastWicketType === "B") {
      setstrike({ index, name: inningArr[inning].batsmanArr[index].name });
      if (inningArr[inning].ballOnThisOver === 6) {
        if (totalRunPrev === inningArr[inning].totalScore) {
          inningArr[inning].bowlerArr[prevBowlerIndex].maiden++;
        }
        inningArr[inning].prevBalls.push("O");
        inningArr[inning].ballOnThisOver = 0;
        inningArr[inning].totalOver++;

        setstrike(swapStrike());
        setbowlerFlag(false);
      }
    } else {
      setstrike({ index: -1, name: "" });
    }
  }
  // ==========================//data ===============================

  function CheckData() {
    console.log(remaningBatsman[inning]);
    console.log(inningArr[inning]);
    console.log(strike);
  }
  function handleSecondInningFlagButton() {
    setflag(true);
    setcurrentBatting([]);
    setstrike({ index: -1, name: "" });
    setbowlerFlag(false);
  }
  function MatchEnd() {
    if (inning === 1) {
      if (inningArr[0].totalScore > inningArr[1].totalScore) {
        winStatus = `${inningArr[0].teamName} won by ${
          inningArr[0].totalScore - inningArr[1].totalScore
        } runs`;
      } else if (inningArr[0].totalScore < inningArr[1].totalScore) {
        winStatus = `${inningArr[1].teamName} won by ${
          remaningBatsman[inning].length + 1
        } wickets`;
      } else {
        winStatus = `match tied`;
      }
      db.collection("Score-Board")
        .doc(props.id)
        .set({ winStatus }, { merge: true });
    }
    
    setflag(false);
    setinning(inning + 1);
    setstrike({ index: -1, name: "" });
  }
  //================================variabes====================================

  // =====================useState=====================================================

  const [flagChange, setflagChange] = React.useState(false);
  const [remaningBatsman, setremaningBatsman] = React.useState(() => {
    let arr = [];
    let arr2 = [];
    for (let i = 0; i < props.team[0].length; i++) {
      arr.push({ index: i, name: props.team[0][i] });
    }
    for (let i = 0; i < props.team[1].length; i++) {
      arr2.push({ index: i, name: props.team[1][i] });
    }
    return [arr, arr2];
  });
  const [flag, setflag] = React.useState(false);
  const [inning, setinning] = React.useState(0);
  const [whoWasOut, setwhoWasOut] = React.useState(-2);
  const [currentBatting, setcurrentBatting] = React.useState([]);
  const [bowlerFlag, setbowlerFlag] = React.useState(false);
  const [bowler, setbowler] = React.useState({
    index: -1,
    name: ""
  });
  const [strike, setstrike] = React.useState({
    index: -1,
    name: ""
  });
  //=================================================================================
  return (
    <div style={{ margin: "5px" }}>
      {flag && (
        <>
          {inning < 2 &&<div>
            <ScoreCard
              currentBatting = {currentBatting}
              strike = {strike}
              bowler = {bowler}
              inning = {inningArr[inning]}
              currentInning={inning}
              teamName = {props.teamName}
            />
          </div>}
          {/* =================================== buttons =============================== */}
          <RunButtons onClick={HandleRunButton} />
          {/* strike================================== */}
          {strike.index === -1 && (
            <DialogFile
              onClose={handleStrike}
              open={true}
              remaning={currentBatting}
              buttonName="who has strike"
            />
          )}

          {/* bowler============================================ */}
          {!bowlerFlag && (
            <DialogFile
              onClose={handleNewBowler}
              open={true}
              remaning={getRemaningBowler()}
              buttonName="who comes to bowl"
            />
          )}

          {/* ==Batsman=========================================== */}

          {remaningBatsman[inning].length && currentBatting.length < 2 && (
            <DialogFile
              onClose={handleNewBatsman}
              open={true}
              remaning={remaningBatsman[inning]}
              buttonName="who comes to bat"
            ></DialogFile>
          )}
          {whoWasOut === -1 && (
            <DialogFile
              onClose={handleWhoWasOut}
              open={true}
              remaning={currentBatting}
              buttonName="who was out"
            />
          )}
        </>
      )}
      <div style={{ textAlign: "center" }}>
        {inning === 2 && <h1>{winStatus}</h1>}
      </div>
      {/* <Button
        style={{ backgroundColor: "gray", color: "blue" }}
        variant="contained"
        onClick={CheckData}
      >
        click
      </Button> */}
      {((inning === 0 && flag) || inning > 0) && (
        <Inning props={inningArr[0]} ing={0} currentInning={inning} id={props.id} flag={flag}  strike = {strike} bowler = {bowler} currentBatting={currentBatting}/>
      )}
      {inning >= 1 && (
        <div style={Style.targetStyle}>
          <h2>
            <span style={Style.horizontalLine}>
              Target: {inningArr[0].totalScore + 1} / {props.totalOverMatch} Ov
            </span>
          </h2>
        </div>
      )}
      {((inning === 1 && flag) || inning === 2) && (
        <Inning props={inningArr[1]} ing={1} id={props.id} currentInning={inning} flag={flag} strike = {strike} bowler = {bowler} currentBatting={currentBatting}/>
      )}
      {inning < 2 && !flag && (
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ backgroundColor: "indianred", margin: "10px" }}
            onClick={handleSecondInningFlagButton}
            variant="contained"
            color="secondary"
          >
            click to start {inning+1} inning
          </Button>
        </div>
      )}
      {/* {inning === 3 && <Resut/>} */}
    </div>
  );
}
