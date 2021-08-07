import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../posts/postsSlice";

export const UserPage = ({ match }) => {
  const dispatch = useDispatch();
  const { userID } = match.params;
  const user = useSelector((state) =>
    state.users.find((userItem) => userItem.userID === userID)
  );
  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, [dispatch]);
  const { posts } = useSelector(selectAllPosts);
  const userPosts = posts.filter((userPost) => userPost.userID === userID);
  if (!user) {
    return (
      <div>
        <h3>User not found</h3>
      </div>
    );
  }
  return (
    <div>
      <section>
        <h2>{user.name}</h2>
        <article>
          {userPosts.length > 0
            ? userPosts.map((userPost) => {
                return (
                  <section key={userPost.postID}>
                    <div className="post-container">
                      <Link
                        className="button button__secondary"
                        to={`/posts/${userPost.postID}`}
                      >
                        <article key={userPost.postID} className="post">
                          <div className="caption"> {userPost.caption} </div>
                        </article>
                      </Link>
                    </div>
                  </section>
                );
              })
            : "No posts from this user"}
        </article>
        <Link to={`/users`} className="button button__secondary">
          Go back
        </Link>
      </section>
    </div>
  );
};
