import React from "react";
import "../ScoreCard.css";
import logo from "./strike.png";
export default function ScoreCard({currentBatting,currentInning, strike, bowler, inning, teamName}) {

  const width = window.innerWidth;
  let batsman1 = "", batsman2 = "";
  let index1 = -2;
  let index2 = -2;
  let name1,name2;
  if(currentBatting.length>0){
    index1=currentBatting[0].index;
    name1 = currentBatting[0].name;
    batsman1=name1;
    if(width < 900)batsman1=batsman1.substring(0,5);
    batsman1 = <>{batsman1}&ensp;{inning.batsmanArr[index1].run}</>;
  }
  if(currentBatting.length>1){
    index2=currentBatting[1].index;
    name2 = currentBatting[1].name;
    batsman2=name2;
    if(width < 900)batsman2=batsman2.substring(0,5);
    batsman2 = <>{batsman2}&ensp;{inning.batsmanArr[index2].run}</>;
  }
  let bowlerName ="", bowlerFeild ="";
  if(bowler.index>-1){
    bowlerName = bowler.name;
    if(width < 900)bowlerName=bowlerName.substring(0,8);
    bowlerFeild = <>{bowlerName}&ensp;{inning.bowlerArr[bowler.index].run}-{inning.bowlerArr[bowler.index].wicket}/{inning.bowlerArr[bowler.index].over}</>;
  }
  return (
    <div className = "scoreBoard">
      <div>
        <span datatooltip={teamName[currentInning]} className = "score">Team{currentInning+1}&ensp;{inning.totalScore}-{inning.wicketArr.length}/{inning.totalOver}.{inning.ballOnThisOver} Ov</span>
        <span datatooltip={name1} className = "batsman">{strike.index === index1? <img src={logo} alt="" />:<></>}{batsman1}</span>
        <span datatooltip={name2} className = "batsman">{strike.index === index2? <img src={logo} alt="" />:<></>}{batsman2}</span>
      </div>
      <div>
        <span className = "inning">INNING {currentInning+1}</span>
        <span datatooltip={bowler.name} className = "bowler">{bowlerFeild}</span>
        <span datatooltip={teamName[(currentInning+1)%2]} className = "bowlingTeam">Team{(currentInning+1)%2+1}</span>
      </div>
    </div>
  );
}
