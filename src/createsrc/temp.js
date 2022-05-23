import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));
export default function BattingButton(props) {
  const classes = useStyles();
  const Style = {
    firstButton: {
      color: "#f0f8ff",
      backgroundColor: "	#2f4f4f"
    },
    secondButton: {
      color: "#f0f8ff",
      backgroundColor: "#556b2f	"
    },
    BattingButtonClass: {
      // padding: "auto 5px"
      // marginRight: "0px"
    }
  };
  return (
    <div className={classes.root} style={Style.BattingButtonClass}>
      {props.flag ? (
        <Badge color="secondary" variant="dot">
          <Button style={Style.firstButton} variant="contained" disabled>
            {props.name ? props.name.substring(0, 12) : ""}
          </Button>
        </Badge>
      ) : (
        <Button style={Style.secondButton} variant="contained" disabled>
          {props.name ? props.name.substring(0, 12) : ""}
        </Button>
      )}
    </div>
  );
}
