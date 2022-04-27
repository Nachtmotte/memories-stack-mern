import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    "& .MuiAutocomplete-root": {
      display: "flex",
      width: "300px",
      [theme.breakpoints.down("sm")]: {
        width: "96%",
      },
    },
    "& #chip-textfield": {
      margin: "10px 0",
    },
    padding: "10px 0",
    borderRadius: 10,
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  pagination: {
    borderRadius: 10,
    marginTop: "2rem",
    padding: "16px",
    width: "100%",
    maxWidth: "400px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  startAdornment: {
    display: "flex",
  },
  searchField: {
    margin: "0 4px 0 10px",
    width: "300px",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
      width: "96%",
    },
  },
  searchButton: {
    [theme.breakpoints.up("md")]: {
      margin: "0 auto 0 4px",
      height: "56px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 0",
      width: "96%",
    },
  },
  newButton: {
    margin: "0 20px",
    [theme.breakpoints.down("sm")]: {
      width: "96%",
    },
  },
}));
