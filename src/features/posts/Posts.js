import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { Reactions } from "./Reactions";
import { fetchPosts, selectAllPosts } from "./postsSlice";

export const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status: postStatus } = useSelector(selectAllPosts);
  const orderedPosts = posts.slice().sort((a, b) => {
    console.log(b.date.localeCompare(a.date));
    return b.date.localeCompare(a.date);
  });
  // useEffect(() => {
  //   if (postStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [dispatch, postStatus]);

  return (
    <div>
      <div className="post-container">
        {postStatus === "loading" && (
          <div>
            <h3>Loading...</h3>
          </div>
        )}
        {postStatus === "succeeded" &&
          orderedPosts.map((post) => {
            return (
              <article key={post.postID} className="post">
                <div>
                  <PostAuthor userID={post.userID} />
                  <TimeAgo timeStamp={post.date} />
                </div>
                <div className="caption"> {post.caption} </div>
                <Reactions post={post} />
                <div>
                  <Link
                    className="button__secondary"
                    to={`/posts/${post.postID}`}
                  >
                    View Post
                  </Link>
                </div>
              </article>
            );
          })}
        {postStatus === "failed" && (
          <div>
            <h3>Failed to fetch, try again</h3>
          </div>
        )}
      </div>
    </div>
  );
};
