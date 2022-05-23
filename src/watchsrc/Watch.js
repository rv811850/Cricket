import React, { useEffect, useState } from "react";
import Head from "../Head";
import Inning from "./Inning";
import ScoreCard from "./ScoreCard";
import firebase from "../Firebase";
import Button from "@material-ui/core/Button";
import gif from "./cricketpending.gif";

const targetStyle = {
  borderBottom: "2px solid #000",
  lineHeight: "0",
  margin: "2.5rem 5px 2.2rem"
};
const horizontalLine = {
  background: "#fff",
  padding: "0 10px"
};
const winStatus = {
  textAlign: "center",
  margin: "1rem 5px"
};

export default function Watch({ match }) {
  const id = match.params.id;
  const intervalRef = React.useRef();
  useEffect(() => {
    const timer = setInterval(async () => {
      firebase
        .firestore()
        .collection("Score-Board")
        .doc(id)
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            setdb(docSnapshot.data());
          }
        });
    }, 5000);
    intervalRef.current = timer;
    return () => clearTimeout(intervalRef.current);
  }, []);
  const [db, setdb] = useState();
  if (db && db.inning === 2) clearInterval(intervalRef.current);
  return (
    <div style={{ margin: "5px" }}>
      {!db && <img style={{width: "300px",transform: "translate(-50%, 50%)",left: "50%", bottom: "50%", position: "absolute"}} src={gif}/> }
      {db && (
        <>
        <div style={{ margin: "-5px" }}>
          <Head
            teamName={db.teamName}
            team1={db.team1}
            team2={db.team2}
            totalOver={db.totalOverMatch}
            tossWon={db.tossWon}
            choose={db.choose}
          />
          </div>
          <div style={winStatus}>
            {db.inning === 2 && <h1>{db.winStatus}</h1>}
          </div>
          {db.inning < 2 && db.flag && <div><ScoreCard
            currentBatting = {db.currentBatting}
            strike = {db.strike}
            bowler = {db.bowler}
            inning = {db.inning===0?db.inning1:db.inning2}
            currentInning={db.inning}
            teamName={db.teamName}
            totalScoreofInning={db.totalScoreofInning}
          /></div>}
          {db.inning === 0 && !db.flag && (
            <div style={{ textAlign: "center", margin: "10px" }}>
              <Button
                style={{ backgroundColor: "indianred" }}
                variant="contained"
                color="secondary"
                disabled
              >
                1st inning is not Starte yet!!!
              </Button>
            </div>
          )}
          {((db.inning === 0 && db.flag) || db.inning > 0) && (
            <Inning inning={db.inning1}  strike = {db.strike} bowler={db.bowler}/>
          )}
          {db.inning >= 1 && (
            <div style={targetStyle}>
              <h2>
                <span style={horizontalLine}>
                  Target: {db.inning1.totalScore + 1} / {db.totalOverMatch} Ov
                </span>
              </h2>
            </div>
          )}
          {db.inning === 1 && !db.flag && (
            <div style={{ textAlign: "center" }}>
              <Button
                style={{ margin: "10px" }}
                variant="contained"
                color="secondary"
                disabled
              >
                second inning is not started yet
              </Button>
            </div>
          )}
          {((db.inning === 1 && db.flag) || db.inning === 2) && (
            <Inning inning={db.inning2} strike = {db.strike} bowler={db.bowler}/>
          )}
        </>
      )}
    </div>
  );
}
