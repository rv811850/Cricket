import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const Style = {
  textAlign: "center"
};

export default function DialogFile(props) {
  const handleListItemClick = (value) => {
    props.onClose(value);
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle>{props.buttonName}</DialogTitle>
      <List style={Style}>
        {props.remaning.map((item) => (
          <ListItem
            style={Style}
            button
            onClick={() => handleListItemClick(item.index)}
            key={item.index}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
