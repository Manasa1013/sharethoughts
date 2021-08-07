import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";
import { addNewPost } from "./postsSlice";
export const AddPost = () => {
  const dispatch = useDispatch();
  console.log(
    useSelector((state) => state.users),
    "from addPOst users value"
  );
  const users = useSelector((state) => state.users);

  const [showInputPost, setShowInputPost] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [post, setPost] = useState({
    title: "",
    postID: nanoid(),
    date: "",
    caption: "",
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    userID: "u1234",
  });
  const canSave =
    Boolean(post.title) &&
    Boolean(post.caption) &&
    Boolean(post.userID) &&
    Boolean(addRequestStatus === "idle");
  const onAddPostClicked = async (post) => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        const resultAction = await dispatch(addNewPost(post));
        unwrapResult(resultAction);
        setPost((prev) => ({
          ...prev,
          title: "",
          caption: "",
          postID: nanoid(),
          date: "",
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          },
          userID: "u1234",
        }));
      } catch (err) {
        console.log(err, "from addPost catch block");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  return (
    <div>
      <section className="input-card">
        <div>
          <button
            className="button__floating"
            onClick={() => setShowInputPost((prev) => !prev)}
          >
            {showInputPost ? "-" : "+"}
          </button>
        </div>
        {
          <article style={{ visibility: showInputPost ? "visible" : "hidden" }}>
            <fieldset className="dropdown-container">
              <legend>Post as:</legend>
              <select
                className="dropdown"
                name="users"
                id="users-select"
                onChange={(e) => {
                  let id = users.find(
                    (userItem) => userItem.userID === e.target.value
                  ).userID;
                  setPost((prev) => ({ ...prev, userID: id }));
                }}
              >
                {users !== undefined
                  ? users.map((user) => (
                      <option key={user.userID} value={user.userID}>
                        {user.name || "Some xyz"}
                      </option>
                    ))
                  : "Some xyz"}
              </select>
            </fieldset>
            <label className="label" htmlFor="title-id">
              Title
            </label>
            <input
              id="title-id"
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
              className="input title"
              value={post.title}
              placeholder="Enter title"
            />
            <label className="label" htmlFor="caption-id">
              Caption
            </label>
            <textarea
              id="caption-id"
              onChange={(e) =>
                setPost((prev) => ({ ...prev, caption: e.target.value }))
              }
              className="input caption"
              value={post.caption}
              placeholder="Enter caption"
            ></textarea>
            <div>
              <button
                type="button"
                disabled={!canSave}
                style={{ opacity: canSave ? "100%" : "70%" }}
                onClick={() => {
                  onAddPostClicked({
                    ...post,
                    date: new Date().toISOString(),
                  });
                }}
                className="button button__primary"
              >
                Add
              </button>
            </div>
          </article>
        }
      </section>
    </div>
  );
};
