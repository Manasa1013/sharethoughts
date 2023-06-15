import React from "react";
import { useDispatch } from "react-redux";
import { reactionPressed } from "./postsSlice";

export const Reactions = ({ post }) => {
  const reactionEmojis = {
    thumbsUp: "👍",
    hooray: "🎉",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀",
  };
  const dispatch = useDispatch();
  const { postID } = post;
  return (
    <section>
      {Object.entries(reactionEmojis).map(([name, emoji]) => {
        return (
          <button
            className="reaction"
            key={name}
            style={{ border: post.reactions !== 0 && "1px solid blue" }}
            onClick={() => dispatch(reactionPressed({ postID, name }))}
          >
            <div>{`${emoji} ${post.reactions[name]}`}</div>
          </button>
        );
      })}
    </section>
  );
};
