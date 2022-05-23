import React, {useEffect, useState} from 'react'
import firebase from "./Firebase";
import "./Nearby.css";
import { useHistory } from "react-router-dom";

let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
let myCords={};
function rad(x) {
  return x * Math.PI / 180;
};
function getDistance(p1, p2) {
  //Haversine formula:
  let R = 6378137; // Earth’s mean radius in meter
  let dLat = rad(p2.lat - p1.lat);
  let dLong = rad(p2.lng - p1.lng);
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d; // returns the distance in meter
};
function success(data) {
  let crd = data.coords;
  let myApiKey = "AIzaSyBrSy-q1TZIon7ZMo1TzBuEJvoB2CuWmpI";
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + crd.latitude + ',' + crd.longitude + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
          location = JSON.stringify(responseJson);
            console.log('ADDRESS GEOCODE is BACK!! => ' + location);
  });

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  Loc = crd;
}


function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
export default function Nearby() {
  const [flag, setflag] = useState(false);
  const [loc, setloc] = useState({});
  const [arr, setarr] = useState([]);
  const history = useHistory();
  useEffect( ()=> {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            // navigator.geolocation.getCurrentPosition(success);===============getting data from google Map
            navigator.geolocation.getCurrentPosition(getData);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(getData, errors, options);
          } else if (result.state === "denied") {
            console.log("permission denied");
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  },[]);
  
  async function getData(cord) {
    const res = await firebase
    .firestore()
    .collection("UserDB")
    .get();
    const temparr = [];
    await Promise.all(res.docs.map(async (item)=>{
      let p1 = {lat: cord.coords.latitude, lng: cord.coords.longitude};
      let p2 = {lat: item.data().latitude, lng: item.data().longitude};
      myCords = p1;
      let r=getDistance(p1, p2);
      if(r < 3526250){
        let data = await getDataFromId(item.data().id);
        data.distance = Math.floor(r/1000);
        temparr.push(data);
      }
    }));
    setarr(temparr);
  }
  async function getDataFromId(id) {
    // for await (const id of ids) {
      let temp={};
      await firebase
      .firestore()
      .collection("Score-Board")
      .doc(id)
      .get()
      .then((res) => {
        if (res.exists) {
          const teamName = res.data().teamName;
          const score = res.data().totalScoreofInning;
          const venue = res.data().venue;
          const inning = res.data().inning;
          const tossWon = res.data().tossWon;
          const choose = res.data().choose;
          if(inning < 2){
            let inningDetails;
            if(inning==0){inningDetails = "FIRST INNING";}
            else {inningDetails = "SECOND INNING";}
            temp = {id, teamName, score, venue, inning, inningDetails, tossWon, choose, tossWon, choose};
          }
        }
      }); 
    // };
    return temp;
  }
  
  function handle(id) {
    history.push(`/watch/${id}`);
  }
  return (
    <>
    <div id="head__line"><h1>Cricket Matches Near To You</h1></div>
    <div id="nearBy">
      {arr.length==0 && <img src="./cricketgif.gif"/>}
      {arr.map(({id, teamName, score, venue, inning, inningDetails, tossWon, choose, distance})=>(
        <div key={id} className="content" onClick={()=>handle(id)}>
          <h1>{teamName[0].substring(0, 3).toUpperCase()} vs {teamName[1].substring(0, 3).toUpperCase()}</h1>
          <div className = "items">
            <div><span>{tossWon.substring(0, 3).toUpperCase()} opt to {choose}</span>
            <span>{inningDetails}</span></div>
            <div><span id="score">{score.substring(0, score.length-3)} {teamName[inning].substring(0, 3).toUpperCase()}</span>
            <span id="venue">Venue {venue.substring(0, 10)}</span></div>
            <div><span>{distance} KM away from you !!!</span></div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}