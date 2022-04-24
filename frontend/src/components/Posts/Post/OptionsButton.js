import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  menuPaper: {
    color: "#3f51b5",
  },
}));

function OptionsButton({ handleEditPost, handleDeletePost }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePressEdit = () => {
    handleEditPost();
    handleClose();
  };

  const handlePressDelete = () => {
    handleDeletePost();
    handleClose();
  };

  return (
    <div>
      <Button id="option-button" onClick={handleClick}>
        <MoreHorizIcon fontSize="medium" color="primary" />
      </Button>
      <Menu
        id="option-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.menuPaper }}
      >
        <MenuItem onClick={handlePressEdit}>
          <EditIcon fontSize="small" />
          &nbsp;Edit
        </MenuItem>
        <MenuItem onClick={handlePressDelete}>
          <DeleteIcon fontSize="small" />
          &nbsp;Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default OptionsButton;
