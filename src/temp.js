

// ===============================================//==========================================
.anotherStyle__{
  font-size: 1rem;
  margin: 10px 0 10px 5px;
  display: flex;
  align-items: center;
  overflow-x: auto;
}
.colorBall{
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 50%;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.384) inset;
}
.overStyle{
  padding: 5px 5px;
  border-radius: 5px;
  margin-right: 15px;
  /* box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.384) inset; */
  border: 1px solid blue;
  background-image: linear-gradient(to right, rgb(240, 55, 240), pink);
  background-color: lightgreen;
}
span[datatooltip]{
  position: relative;
}
span[datatooltip]:hover::after{
  content: attr(datatooltip);
  text-transform: uppercase;
  position: absolute;
  /* top: -35px; */
  border-radius: 3px;
  background-color: gray;
  padding: 5px 10px;
  z-index: 2;
  border-left: 5px solid blue;
}

table {
  border-collapse: collapse;
  table-layout: auto;
  width: 100%;
}

th {
  background-color: #b6b6b6;
}

tr:nth-child(odd) {
  background-color: #f5f5f5;
}

td,
th {
  border-bottom: 1px solid #ddd;
  padding: 5px;
}

.table__middleAlign {
  text-align: center;
}

tr:last-child {
  border-bottom: 1.5px solid #a3a3a3;
}

td:nth-child(1) {
  color: #8a2be2;
}

.table__leftAlign {
  text-align: left;
}

#batting__topBar {
  width: 100%;
  margin-top: 1rem;
  height: 2rem;
  background-color: rgb(65, 65, 65);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#summery__div {
  margin: 1rem 0;
}

#top__summery {
  overflow-x: auto;
  display: flex;
  align-items: center;
}


#top__summery > span {
  background-color: #b6b6b6;
  padding: 5px;
  border-radius: 3px;
  margin-right: 1rem;
  white-space: nowrap;
}

#prevBall__button {
  display: inline-block;
  font-size: 12px;
  margin-top: 1rem;
  cursor: pointer;
  padding: 5px;
  color: white;
  background-color: blue;
  border-radius: 3px;
}

#summery__prevBall {
  width: 100%;
  padding-top: 10px;
  display: flex;
  margin-bottom: 1rem;
}
.prevOneOver {
  white-space: nowrap;
  border: 1px solid blue;
  overflow-x: hidden;
  max-width: 500px;
  border-left: 7px solid blue;
  border-right: 7px solid blue;
}


// =======================================
<div style={Style.container}>
            <div style={Style.battingContainer}></div>

              {/* <BattingButton
                name={currentBatting.length > 0 ? currentBatting[0].name : ""}
                flag={
                  currentBatting.length > 1 &&
                  strike.index === currentBatting[0].index
                    ? true
                    : false
                }
              />
              <BattingButton
                name={currentBatting.length > 1 ? currentBatting[1].name : ""}
                flag={
                  currentBatting.length > 1 &&
                  strike.index === currentBatting[1].index
                    ? true
                    : false
                }
              /> */}

            {/* <Button
              style={{ backgroundColor: "gray", color: "blue" }}
              variant="contained"
              disabled
            >
              {bowler.index > -1 ? bowler.name.substring(0, 12) : ""}
            </Button> */}

</div>
          </div>
              // =============================