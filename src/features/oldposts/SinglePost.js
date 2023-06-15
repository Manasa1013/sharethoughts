import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { ViewPost } from "./ViewPost";

export const SinglePost = ({ match }) => {
  const { postID } = match.params;
  const singlePost = useSelector((state) => selectPostById(state, postID));
  if (!singlePost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <div>
      <section>
        <ViewPost post={singlePost} />
      </section>
    </div>
  );
};
