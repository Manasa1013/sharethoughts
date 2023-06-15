import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";

export const Users = () => {
  const users = useSelector(selectAllUsers);
  return (
    <div>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(({ userID, name }) => {
            return (
              <li
                style={{
                  listStyle: "none",
                }}
              >
                <Link
                  className="button button__Link"
                  key={userID}
                  to={`/users/${userID}`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
