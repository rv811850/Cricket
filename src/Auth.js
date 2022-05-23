import React, { useState, useEffect } from "react";
import firebase from "./Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./Auth.css";
import Create from "./createsrc/Create";

const Auth = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [user, setUser] = useState(() => "");
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((res) => {
      setUser((prevState) => res);
      setIsSignedIn((prevState) => !!res);
    });
    return false;
  }, []);
  return (
    <div>
      {isSignedIn ? (
        <Create/>
      ) : (
        <div>
          <div id="login">
            <h1>login</h1>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
