import React, { useEffect, useState } from "react";
import classes from "./dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "react-query";
import { fetchComments, fetchPosts } from "./utils";
import { Card } from "tamagui";

const DashBoard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery<any>(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      keepPreviousData: true,
    }
  );

  const posts = data && data.posts;
  const allPosts = data && data.allPosts;
  const { data: commentsData } = useQuery("comments", fetchComments);

  const handleNaviagte = (redirect: string) => {
    navigate(redirect);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (
      allPosts &&
      allPosts[allPosts?.length - 1]?.id !== posts[posts?.length - 1]?.id
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <nav className={classes.navBar}>
        <li
          onClick={() => {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            handleNaviagte("/");
          }}
        >
          SignOut
        </li>
      </nav>

      <h1>DashBoard</h1>
      <div className={classes.paginationContainer}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={classes.paginationButton}
        >
          Prev Page
        </button>
        <div className={classes.currentPage}>{currentPage}</div>
        <button
          onClick={handleNextPage}
          className={classes.paginationButton}
          disabled={
            allPosts &&
            allPosts[allPosts?.length - 1]?.id === posts &&
            posts[posts?.length - 1]?.id
          }
        >
          Next Page
        </button>
      </div>
      <div className={classes.cardWrapper}>
        {posts?.map((element: any) => {
          return (
            <Card className={classes.cardContainer}>
              <li className={classes.list}>
                <div className={classes.label}>UserId:</div>
                <div>{element.id}</div>
              </li>
              <li className={`${classes.list} ${classes.listItems}`}>
                <div className={classes.label}>Title:</div>
                <div>{element.title}</div>
              </li>
              <li className={`${classes.list} ${classes.listItems}`}>
                <div className={classes.label}>Body:</div>
                <div>{element.body}</div>
              </li>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoard;
