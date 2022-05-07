import React from "react";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

function InputChip({
  chips,
  setChips,
  fieldLabel,
}) {
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
      id="chip-autocomplete"
      multiple
      value={chips}
      onChange={(e) =>
        e.target.value ? setChips([...chips, e.target.value]) : setChips([])
      }
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
            id="chip-textfield"
            {...params}
            variant="outlined"
            label={fieldLabel}
          />
        );
      }}
    />
  );
}

export default InputChip;
