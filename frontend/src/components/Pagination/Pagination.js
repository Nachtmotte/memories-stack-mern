import React from "react";
import { useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link, useLocation } from "react-router-dom";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Paginate = ({ page, setPage }) => {
  const query = useQuery();
  const tags = query.get("tags");
  const searchQuery = query.get("searchQuery");
  const { numberOfPages } = useSelector((state) => state.posts);

  const classes = useStyles();

  return (
    <Pagination
      onChange={(event, value) => setPage(value)}
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?${searchQuery ? "searchQuery=".concat(searchQuery) : ""}${
            tags ? "tags=".concat(tags) : ""
          }&page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
