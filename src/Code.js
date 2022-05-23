import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Code.css";
import firebase from "./Firebase";

export default function Watch() {
  const [code, setCode] = useState("");
  const history = useHistory();
  const check = () => {
    if (!code) return;
    firebase
      .firestore()
      .collection("Score-Board")
      .doc(code)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          history.push(`/watch/${code}`);
        } else {
          alert(`invalid code <${code}>`);
        }
      });
  };
  return (
    <div id="home__container">
      <div id="validation">
        <h1>Enter Code</h1>
        <input
          autoComplete = "off"
          id="code__input"
          value={code}
          onChange={(e) => {
            e.preventDefault();
            setCode(e.target.value);
          }}
          type="text"
          onKeyDown={(e) => {
            e.keyCode === 13 && check();
          }}
        />
        <br />
        <button type="submit" onClick={check} id="code__button">
          submit
        </button>
      </div>
    </div>
  );
}
// const handleKeypress = e => {
//   //it triggers by pressing the enter key
// if (e.keyCode === 13) {
//   handleSubmit();
// }
// };
