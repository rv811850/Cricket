import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DialogFile from "./DialogFile";

export default function MenuButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [flag, setflag] = React.useState(false);
  const run = [
    { name: "0 run", index: 0 },
    { name: "single run", index: 1 },
    { name: "two runs", index: 2 },
    { name: "three runs", index: 3 }
  ];
  const handleClick = (event) => {
    // setopen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (value === "KRun Out") {
      setAnchorEl(null);
      setflag(true);
      return;
    } else {
      setflag(false);
      if (typeof value === "number") {
        value = "R" + value + run[value].name;
      } else setAnchorEl(null);
      props.onClose(value);
    }
  };
  const Style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    maxWidth: "350px"
  };
  const StyleMenuItem = {
    justifyContent: "center"
  };
  return (
    <div style={Style}>
      <Button
        variant="contained"
        aria-controls={props.open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.type}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        marginThreshold={10}
        anchorOrigin={{
          vertical: 42,
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        {props.arr.map((item) => (
          <MenuItem
            key={item}
            style={StyleMenuItem}
            onClick={() => handleClose(item)}
          >
            {item.substring(1)}
          </MenuItem>
        ))}
      </Menu>
      {flag && (
        <DialogFile
          onClose={handleClose}
          open={true}
          remaning={run}
          buttonName="How much run they got"
        />
      )}
    </div>
  );
}
