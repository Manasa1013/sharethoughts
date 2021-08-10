import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchNotifications } from "../features/notifications/notificationsSlice";
export const Navbar = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  console.log(pathname, "from navbar path");
  const [refreshNotifs, setRefreshNotifs] = useState(true);

  return (
    <nav>
      <section className="nav--container">
        <div className="nav--contents">
          <div className="nav--links">
            <Link className="button button__secondary" to="/">
              Posts
            </Link>
            <Link className="button button__secondary" to="/users">
              Users
            </Link>
            <Link className="button button__secondary" to="/notifications">
              Notifications
            </Link>
            {pathname === "/notifications" && (
              <button
                type="button"
                className="button button__Link"
                onClick={(prev) => {
                  setRefreshNotifs(!prev);
                  dispatch(fetchNotifications());
                }}
              >
                {refreshNotifs ? "Loading..." : "Refresh Notifications"}
              </button>
            )}
          </div>
        </div>
      </section>
    </nav>
  );
};
