import React, { useEffect } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";

import { Container, Grow, Grid } from "@material-ui/core";

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);

  return (
    <div>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
}

export default Home;
