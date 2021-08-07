import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsUpdated } from "./postsSlice";
import "../../index.css";
import { useHistory, useLocation } from "react-router";
import { selectPostById } from "./postsSlice";

export const EditPost = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postID } = match.params;
  const editablePost = useSelector((state) => selectPostById(state, postID));
  const [editPost, setEditPost] = useState(editablePost);
  if (!editablePost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  const onSavePostClicked = (editPost) => {
    return (dispatch) => {
      if (editPost.title && editPost.caption) {
        dispatch(postsUpdated(editPost));
        history.push(`/posts/${postID}`);
      }
    };
  };

  return (
    <div>
      <section className="edit-post--container">
        <label htmlFor="title-id">Title</label>
        <input
          type="text"
          id="title-id"
          placeholder="Edit title"
          className="input title"
          value={editPost.title}
          onChange={(e) =>
            setEditPost((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <label htmlFor="caption-id">Caption</label>
        <textarea
          placeholder="Edit caption"
          id="caption-id"
          className="input caption"
          onChange={(e) =>
            setEditPost((prev) => ({ ...prev, caption: e.target.value }))
          }
          value={editPost.caption}
        ></textarea>
        <button
          type="button"
          className="button button__primary"
          onClick={() => {
            dispatch(
              onSavePostClicked({ ...editPost, date: new Date().toISOString() })
            );
          }}
        >
          Save
        </button>
      </section>
    </div>
  );
};
