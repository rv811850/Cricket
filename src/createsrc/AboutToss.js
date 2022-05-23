import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// ================================================================dialog //

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function AboutToss(props) {
  const classes = useStyles();

  const [toss, settoss] = useState("");
  const [choose, setchoose] = useState("");
  const [totalOver, settotalOver] = useState("");
  const handleChangeToss = (event) => {
    settoss(event.target.value);
  };
  function handleChangeChoose(event) {
    setchoose(event.target.value);
  }
  function handleChangeOver(e) {
    if (
      e.target.value <= 0 ||
      e.target.value > 100 ||
      Math.floor(e.target.value) !== Math.ceil(e.target.value)
    ) {
      e.target.value = "";
    }
    settotalOver(e.target.value);
  }
  const StyleCss = {
    container: {
      width: "100vw",
      height: "70vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-around"
    },
    textField: { maxWidth: "73px" },
    AboutToss__div: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    textField__div: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }
  };
  return (
    <div style={StyleCss.AboutToss__div}>
      <div style={StyleCss.container}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Toss</InputLabel>
          <Select value={toss} onChange={handleChangeToss} label="toss">
            <MenuItem value={0}>{props.team1}</MenuItem>
            <MenuItem value={1}>{props.team2}</MenuItem>
          </Select>
          <FormHelperText>Who won the toss</FormHelperText>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Chose</InputLabel>
          <Select value={choose} onChange={handleChangeChoose} label="choose">
            <MenuItem value={"bat"}>bat</MenuItem>
            <MenuItem value={"bowl"}>ball</MenuItem>
          </Select>
          <FormHelperText>What did they choose</FormHelperText>
        </FormControl>
        <div style={StyleCss.textField__div}>
          <TextField
            style={StyleCss.textField}
            type="number"
            label="Overs"
            placeholder="Overs"
            variant="outlined"
            value={totalOver}
            onChange={handleChangeOver}
          />
          <FormHelperText>total Over</FormHelperText>
        </div>
        {totalOver > 0 && toss !== -1 && choose ? (
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "1rem" }}
            onClick={(e) => props.getAboutTossData({ choose, totalOver, toss })}
          >
            Submit
          </Button>
        ):
        <Button
          disabled
          variant="contained"
          color="secondary"
          style={{ margin: "1rem" }}
        >
          Submit
        </Button>
          }
      </div>
    </div>
  );
}

export default AboutToss;
