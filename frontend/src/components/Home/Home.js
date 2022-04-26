import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
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
  const buttonEnabled = search.trim() || tags.length;

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

  return (
    <div>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputChip
                  chips={tags}
                  setChips={setTags}
                  fieldLabel={"Search Tags"}
                  fieldStyle={{ margin: "10px 0" }}
                />
                <Button
                  onClick={handleSearch}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained"
                  disabled={!buttonEnabled}
                >
                  Search
                </Button>
              </AppBar>
              <Form />
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} setPage={setPage} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
}

export default Home;
