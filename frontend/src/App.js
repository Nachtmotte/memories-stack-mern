import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import { Container } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.auth.authData);

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate to="/posts" />} />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetails />} />
        <Route
          path="/auth"
          exact
          element={!user ? <Auth /> : <Navigate to="/posts" />}
        />
      </Routes>
    </Container>
  );
};

export default App;
