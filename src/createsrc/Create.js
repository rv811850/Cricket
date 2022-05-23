import React, { useState } from "react";
import AboutToss from "./AboutToss";
import Head from "../Head";
import CreateHead from "./CreateHead";
import MakeScoreBoard from "./MakeScoreBoard";
import firebase from "../Firebase";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
const db = firebase.firestore();
let id;
let captain;
let teamName;
let choose;
let totalOverMatch;
let tossWon;
let team;

export default function Create() {
  const [count, setcount] = useState(1);
  React.useEffect(()=>{
    id = db.collection("Score-Board").doc().id;
    captain = [];
    teamName = [];
    team = [];
  },[])
  function getData(data) {
    const temp = [];
    for (let i = 1; i < data.length; i++) {
      temp.push(data[i].name);
    }
    team.push(temp);
    teamName.push(data[0].name);
    captain.push(data[1].name);
    setcount((prevCount) => prevCount + 1);
  }
  function getAboutTossData(data) {
    let batting;
    tossWon = teamName[parseInt(data.toss, 10)];
    if (data.choose === "bat") {
      batting = data.toss;
    } else {
      batting = data.toss === 1 ? 0 : 1;
    }
    if(batting === 1){
      teamName=[teamName[1],teamName[0]];
      team = [team[1], team[0]];
      captain = [captain[1], captain[0]];
    }
    choose = data.choose;
    totalOverMatch = parseInt(data.totalOver, 10);
    db.collection("Score-Board")
      .doc(id)
      .set({ tossWon, choose: data.choose, totalOverMatch, teamName, team1: team[0], team2: team[1], captain}, { merge: true });
    setcount((prevCount) => prevCount + 1);
  }
  return (
    <div>
      {count === 1 && (
        <CreateHead inputType="Team1" getData={(data) => getData(data)} />
      )}
      {count === 2 && (
        <CreateHead inputType="Team2" getData={(data) => getData(data)} />
      )}
      {count === 3 && (
        <AboutToss
          team1={teamName[0]}
          team2={teamName[1]}
          getAboutTossData={(data) => getAboutTossData(data)}
        />
      )}
      {count === 4 && (
        <>
          <Head
            teamName={teamName}
            team1={team[0]}
            team2={team[1]}
            totalOver={totalOverMatch}
            tossWon={tossWon}
            choose={choose}
          />
          <MakeScoreBoard
            team={team}
            captain={captain}
            teamName={teamName}
            totalOverMatch={totalOverMatch}
            id={id}
          />
          <div style={{ textAlign: "center", margin: "30px auto 10px",position: "relative" }}>
            <h3
              style={{marginBottom:"5px", color:"green"}}
            >
              {id}
            </h3>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ArrowUpwardIcon /> watch live score
            </p>
            <button id="logoutButton" onClick={()=>firebase.auth().signOut()}>
              signout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
