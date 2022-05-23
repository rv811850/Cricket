import React from 'react'
import './Home.css'
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import RoomIcon from '@material-ui/icons/Room';
import {useHistory} from 'react-router-dom';

function Home() {
  const history = useHistory();
  return (
    <>
      <div id = "home__container">
      <div>
        <div
          className = "home__div"
          id = "create"
          onClick = {()=> history.push("/create")}
        ><BorderColorRoundedIcon className = "home__Icon"/> Create Score Card</div>

        <div
          className = "home__div"
          id = "watch"
          onClick = {()=> history.push("/code")}
        ><LiveTvIcon className = "home__Icon"/> Watch Live Score</div>

        <div
          className = "home__div"
          id = "nearby"
          onClick = {()=> history.push("/nearby")}
        ><RoomIcon className = "home__Icon"/> Nearby Me</div>
      </div>
      </div>
    </>
  );
}

export default Home;

