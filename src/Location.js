location = "";
function success(data) {
  let crd = data.coords;
  // let myApiKey = "AIzaSyAy0x8HvMFIK8WLcje6qN1a9NqdTGBXW2U";
  // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + crd.latitude + ',' + crd.longitude + '&key=' + myApiKey)
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         location = JSON.stringify(responseJson);
  //           console.log('ADDRESS GEOCODE is BACK!! => ' + location);
  // });
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  console.log("$");
  console.log(crd);
  location = crd;
}
// export default  Location= ()=> {
  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          console.log(result.state);
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          location = navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          console.log("permission denied");
        }
        result.onchange = function () {
          console.log(result.state);
        };
        console.log("#");
        console.log(location);
      });
  } else {
    alert("Sorry Not available!");
  }
//   return location;
// }
export default location;