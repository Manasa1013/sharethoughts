import React from "react";
import { useSelector } from "react-redux";
export const PostAuthor = ({ userID }) => {
  const user = useSelector((state) => state.users).find(
    (userItem) => userItem.userID === userID
  );

  return <span>by {user ? user.name : "Unknown user"}</span>;
};
