import React, { useState } from "react";
import "../Inning.css";

function Inning({ inning ,strike, bowler}) {

  function Delivery(ball) {
    if (ball === "0") {
      return <span>&#x25cf;</span>;
    } else if (ball === "O") {
      return <span>&emsp;</span>;
    }
    return <span>{ball}</span>;
  }

  const handleButtonClick = () => {
    if (buttonName === "This Over") {
      setbuttonName("Previous Overs");
    } else {
      setbuttonName("This Over");
    }
  };
  
  
  const StyleColor = [
    { backgroundColor: "dimgray", color: "lavender" },
    { backgroundColor: "gainsboro" },
    { backgroundColor: "mediumpurple" },
    { backgroundColor: "crimson" },
    { backgroundColor: "cornflowerblue" },
    { backgroundColor: "coral" }
  ];

  const [buttonName, setbuttonName] = useState("This Over");
  const Overs=[];
  const width = window.innerWidth;
  let i = 0;
  let over = 1;
  while (i < inning.prevBalls.length) {
    let item = [];
    while (i < inning.prevBalls.length && inning.prevBalls[i] !== "O") {
      let ball=findPrevBall(inning.prevBalls[i]);
      item.push(
      <span key={i} className="colorBall" datatooltip={findToolTip(inning.prevBalls[i])} style={StyleColor[colorIndex(ball)]}>
          {Delivery(ball)}
      </span>
      );
      i++;
    }
    Overs.push(<div className="OversRow"><span className="overStyle">Over {over++}</span><div className="anotherStyle__">{item}</div></div>);
    i++;
  }
  function findToolTip (data){
    for(let i=0;i<data.length;i++){
      if(data[i]==' '){
        return data.substring(i);
      }
    }
    return ;
  }
  function findPrevBall (data){
    for(let i=0;i<data.length;i++){
      if(data[i]==' '){
        return data.substring(0,i);
      }
    }
    return data;
  }
  function colorIndex(ball){
    if(ball === "6")return 3;
    else if(ball === "4")return 2;
    else if(ball === "Wk")return 4;
    else if(ball === "0")return 0;
    else return 1;
  }
  return (
    <div className="inning__class">
      <div id="batting__topBar">
        <span>{inning.teamName.toUpperCase()} inning</span>
        <span>
          {inning.totalScore}-{inning.wicketArr.length}&ensp;/{" "}
          {inning.totalOver}.{inning.ballOnThisOver} Ov
        </span>
      </div>
      <div style={{width: "100%"}}>
      <table>
        <tbody>
        <tr>
          <th className="table__leftAlign">Batsman</th>
          {width > 600 && <th>&ensp;</th>}
          <th className="table__middleAlign">R</th>
          <th className="table__middleAlign">B</th>
          <th className="table__middleAlign">4s</th>
          <th className="table__middleAlign">6s</th>
          <th className="table__middleAlign">SR</th>
        </tr>
        </tbody>
        {inning.batsmanArr.map((obj,index) =>(
            <>
            <tbody>
              <tr key={index}>
                <td className="table__leftAlign">
                  {obj.name.substring(0, 20)}
                </td>
                {width > 600 && (
                  <td className="table__leftAlign">
                    {strike.index===obj.id?(<i>batting</i>):<i>{obj.typeOut} {obj.wicketTaker}</i>}
                  </td>
                )}
                <td className="table__middleAlign">{obj.run}</td>
                <td className="table__middleAlign">{obj.ball}</td>
                <td className="table__middleAlign">{obj.four}</td>
                <td className="table__middleAlign">{obj.six}</td>
                <td className="table__middleAlign">
                  {((obj.run * 100) / (obj.ball ? obj.ball : 1)).toFixed(2)}
                </td>
              </tr>
            </tbody>
              {width <= 600 && (
                <tbody>
                <tr>
                  <td colSpan="6" style = {{fontSize: "10px",color: "blue"}}>
                    {strike.index===obj.id?(<>batting</>):<>{obj.typeOut} {obj.wicketTaker}</>}
                  </td>
                </tr>
                </tbody>
              )}
          </>)
        )}
      </table>
      </div>
      {/* -------------------------------------------------------------- */}

      <div id="summery__div">
        <div id="top__summery">
          {inning.lastWicket && (
            <span>Last Wicket:&ensp;{inning.lastWicket}</span>
          )}
          {inning.lastSix && <span>Last Six:&ensp;{inning.lastSix}</span>}
        </div>
        <div id="prevBall__button" onClick={handleButtonClick}>
          {buttonName}
        </div>
        <div id="summery__prevBall">
          {buttonName === "This Over" ? (
            <div className="prevOneOver">
              {Overs[inning.totalOver]}
            </div>
          ) : 
            <div className="prevOneOver">
            {Overs.map((items) => (
              items
            ))}
            </div>
          }
        </div>
      </div>

      <table>
        <tbody>
        <tr>
          <th className="table__leftAlign">Bowler</th>
          <th>O</th>
          <th>M</th>
          <th>Wk</th>
          <th>R</th>
          <th>ECO</th>
        </tr>
        </tbody>
        {inning.bowlerArr.map((obj,index) =>(
            <tbody>
            <tr key={index}>
              <td className="table__leftAlign">{obj.name.substring(0, 12)}{bowler.index===obj.id&&(<span>*</span>)}</td>
              <td className="table__middleAlign">{obj.over}</td>
              <td className="table__middleAlign">{obj.maiden}</td>
              <td className="table__middleAlign">{obj.wicket}</td>
              <td className="table__middleAlign">{obj.run}</td>
              <td className="table__middleAlign">
                {(
                  (obj.run * 6) /
                  ((obj.over * 10 - Math.floor(obj.over) * 4)===0?1:(obj.over * 10 - Math.floor(obj.over) * 4))
                ).toFixed(2)}
              </td>
            </tr>
            </tbody>
          )
        )}
      </table>
    </div>
  );
}

export default Inning;
