import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function OptionsButton({ handleEditPost, handleDeletePost }) {
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
      >
        <MenuItem onClick={handlePressEdit} style={{color: "#3F51B5"}}>
          <EditIcon fontSize="small" />
          &nbsp;Edit
        </MenuItem>
        <MenuItem onClick={handlePressDelete} style={{color: "#E91E63"}}>
          <DeleteIcon fontSize="small" />
          &nbsp;Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default OptionsButton;
