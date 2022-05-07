import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import InputChip from "../InputChip/InputChip";
import { getPostsBySearch } from "../../redux/actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const [page, setPage] = useState(query.get("page") || 1);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const user = useSelector((state) => state.auth.authData);
  const buttonEnabled = search.trim() || tags.length;
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    searchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const searchPosts = () => {
    dispatch(getPostsBySearch({ search, tags: tags.join(","), page }));
    navigate(
      `/posts?${search ? "searchQuery=".concat(search, "&") : ""}${
        tags.length ? "tags=".concat(tags.join(","), "&") : ""
      }page=${page}`
    );
  };

  const handleSearch = () => {
    if (page !== 1) {
      setPage(1);
    } else {
      searchPosts();
    }
  };

  const handleOpen = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <Grow in>
        <Container maxWidth="xl">
          <Grid container>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                className={classes.searchField}
                name="search"
                variant="outlined"
                label="Search Memories"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputChip
                chips={tags}
                setChips={setTags}
                fieldLabel={"Search Tags"}
              />
              <Button
                onClick={handleSearch}
                className={classes.searchButton}
                color="primary"
                variant="contained"
                disabled={!buttonEnabled}
              >
                <SearchIcon />
              </Button>
              <Button
                className={classes.newButton}
                onClick={handleOpen}
                color="primary"
                variant="contained"
                disabled={!user}
              >
                New Memory
              </Button>
            </AppBar>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Posts />
          </Grid>
          <Grid container justifyContent="center">
            <Paper className={classes.pagination} elevation={6}>
              <Paginate page={page} setPage={setPage} />
            </Paper>
          </Grid>
          <Form
            open={openDialog}
            setOpen={setOpenDialog}
            handleOpen={handleOpen}
          />
        </Container>
      </Grow>
    </div>
  );
}

export default Home;
