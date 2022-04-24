import React from "react";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

function InputChip({ chips, setChips, fieldLabel, fieldStyle }) {
  const handleRemoveChip = (value) => {
    setChips(chips.filter((chip) => chip !== value));
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case ",":
      case " ": {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          setChips([...chips, event.target.value]);
        }
        break;
      }
      default:
    }
  };

  return (
    <Autocomplete
      style={{ display: "flex", width: "100%" }}
      multiple
      value={chips}
      onChange={(e) =>
        e.target.value ? setChips([...chips, e.target.value]) : setChips([])
      }
      id="chips-filled"
      options={[]}
      freeSolo
      renderTags={(values) => {
        return values.map((value, index) => (
          <Chip
            key={index}
            label={value}
            onDelete={() => {
              handleRemoveChip(value);
            }}
          />
        ));
      }}
      renderInput={(params) => {
        params.inputProps.onKeyDown = handleKeyDown;
        return (
          <TextField
            style={fieldStyle}
            {...params}
            variant="outlined"
            label={fieldLabel}
            fullWidth
          />
        );
      }}
    />
  );
}

export default InputChip;
