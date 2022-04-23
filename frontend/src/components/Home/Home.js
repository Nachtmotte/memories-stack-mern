import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Chip,
} from "@material-ui/core";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleDeleteChip = (name) => {
    setTags(tags.filter((tag) => tag !== name));
  };

  console.log(tags);

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
                  onKeyDown={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <TextField
                  style={{ margin: "10px 0" }}
                  fullWidth
                  variant="outlined"
                  label="Search Tags"
                  onKeyDown={handleKeyDown}
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  multiline
                  InputProps={
                    tags.length
                      ? {
                          startAdornment: (
                            <div style={{ width: "100%" }}>
                              {tags.map((item) => (
                                <Chip
                                  key={item}
                                  label={item}
                                  onDelete={() => handleDeleteChip(item)}
                                />
                              ))}
                            </div>
                          ),
                        }
                      : {}
                  }
                />
              </AppBar>
              <Form />
              <Paper className={classes.pagination} elevation={6}>
                <Paginate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
}

export default Home;
