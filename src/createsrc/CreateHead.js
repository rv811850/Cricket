import React, { useState } from "react";
import "./CreateHead.css";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

// =======================================================
const textInputbutton = {
  display: "flex",
  backgroundColor: "yellowgreen",
  margin: "16px auto 10px auto"
};
function CreateHead(props) {
  const [Style, setStyle] = useState({
    marginBottom: "4.62rem"
  });
  const [teamPlayers, setteamPlayers] = useState([]);
  const [inputFeild, setinputFeild] = useState("");
  const [inputType, setinputType] = useState(props.inputType + " Name");
  const [uniqueKey, setuniqueKey] = useState(0);
  function deletePlayer(key) {
    for (let i = 2; i < teamPlayers.length; i++) {
      if (teamPlayers[i].key === key) {
        teamPlayers.splice(i, 1);
        break;
      }
    }
    if (teamPlayers.length === 11) {
      setStyle({ marginBottom: "4.62rem" });
    }
    setteamPlayers([...teamPlayers]);
  }

  function checkSubmission(e) {
    e.preventDefault();
    if (teamPlayers.length < 12) {
      const answer = window.confirm(
        `are only ${teamPlayers.length - 1} players playing ?`
      );
      if (answer) {
        props.getData(teamPlayers);
      }
    } else {
      props.getData(teamPlayers);
    }
  }

  function getInputFeild(e) {
    e.preventDefault();
    if (!inputFeild) return;
    if (inputFeild) setinputFeild("");
    if (inputType === props.inputType + " Name") setinputType("Captain Name");
    else setinputType("Player Name");
    if (teamPlayers.length === 11) {
      setStyle({ marginBottom: "0rem" });
    }
    setteamPlayers([...teamPlayers, { name: inputFeild, key: uniqueKey }]);
    setuniqueKey((prevKey) => prevKey + 1);
  }
  return (
    <div className="createHead">
      <div className="team__inputName" style={Style}>
        {teamPlayers.map((item, index) => {
          let button = <></>;
          if (index > 1) {
            button = (
              <span>
                <IconButton
                  aria-label="delete"
                  onClick={() => deletePlayer(item.key)}
                >
                  <DeleteIcon className="createHead__icon" />
                </IconButton>
              </span>
            );
          }
          return (
            <div className="team__input" key={index}>
              <span>{item.name}</span> {button}
            </div>
          );
        })}
        {teamPlayers.length > 5 && (
          <Button
            style={textInputbutton}
            variant="contained"
            onClick={(e) => checkSubmission(e)}
          >
            Submit
          </Button>
        )}
      </div>
      {teamPlayers.length < 12 && (
        <>
          <div className="textInput">
            <TextField
              label={inputType}
              placeholder={inputType}
              variant="outlined"
              value={inputFeild}
              onChange={(e) => {
                e.preventDefault();
                setinputFeild(e.target.value);
              }}
              onKeyUp={(e) => {
                e.keyCode === 13 && getInputFeild(e);
              }}
            />
            <Fab
              id="createHead__addIcon"
              color="primary"
              aria-label="add"
              onClick={getInputFeild}
            >
              <AddIcon />
            </Fab>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateHead;
