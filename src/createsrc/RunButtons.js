import React from "react";
import Fab from "@material-ui/core/Fab";
import MenuButton from "./MenuButton";
import "./RunButtons.css";

export default function RunButton(props) {
  function HandleClick(value) {
    if (typeof value === "string") props.onClick(value);
  }
  const StyleColor = [
    { backgroundColor: "dimgray", color: "lavender" },
    { backgroundColor: "gainsboro" },
    { backgroundColor: "gainsboro" },
    { backgroundColor: "gainsboro" },
    { backgroundColor: "mediumpurple" },
    { backgroundColor: "crimson" },
    { backgroundColor: "cornflowerblue" },
    { backgroundColor: "coral" }
  ];
  const Style = {
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "450px",
    width: "100%"
  };
  const wicketType = ["KBold", "KCatch", "KRun Out"];
  const extra = ["E0", "E1", "E2", "E3", "E4", "E6"];
  const arr=[];
  arr.push(<>
  <MenuButton
    open={true}
    type="Wicket"
    arr={wicketType}
    onClose={HandleClick}
  />
  <Fab
    style={StyleColor[6]}
    size="medium"
    onClick={() => HandleClick("WD")}
  >
    WD
  </Fab>
  <Fab
    style={StyleColor[7]}
    size="medium"
    onClick={() => HandleClick("NB")}
  >
    NB
  </Fab>
  <MenuButton
    open={true}
    type="Extra"
    arr={extra}
    onClose={HandleClick}
  />
  </>);
  const width = window.innerWidth;
  return (
    <div className="runButton">
      <div>
        <Fab
          style={StyleColor[0]}
          size="medium"
          onClick={() => HandleClick("0")}
        >
          &#x25cf;
        </Fab>
        <Fab
          style={StyleColor[1]}
          size="medium"
          onClick={() => HandleClick("1")}
        >
          1
        </Fab>
        <Fab
          style={StyleColor[2]}
          size="medium"
          onClick={() => HandleClick("2")}
        >
          2
        </Fab>
        <Fab
          style={StyleColor[3]}
          size="medium"
          onClick={() => HandleClick("3")}
        >
          3
        </Fab>
        <Fab
          style={StyleColor[4]}
          size="medium"
          onClick={() => HandleClick("4")}
        >
          4
        </Fab>
        <Fab
          style={StyleColor[5]}
          size="medium"
          onClick={() => HandleClick("6")}
        >
          6
        </Fab>
        {width > 650 && arr}
      </div>
      <div>
        {width <= 650 && arr}
      </div>
    </div>
  );
}