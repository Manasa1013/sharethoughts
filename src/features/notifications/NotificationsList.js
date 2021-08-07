import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications } from "./notificationsSlice";
import { TimeAgo } from "../posts/TimeAgo";

export const NotificationsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let notifsTimer;

    try {
      notifsTimer = setTimeout(function () {
        dispatch(fetchNotifications());
      }, 1000);
    } catch (err) {
      console.error("error at notifs list comp");
      clearTimeout(notifsTimer);
    } finally {
    }
  }, [dispatch]);
  const { notifications, status, error } = useSelector(
    (state) => state.notifications
  );

  return (
    <div>
      <h3>NotificationsList</h3>
      {status === "loading" && <div>Loading...</div>}
      {status === "succeeded" && (
        <div>
          <section className="notification__container">
            {notifications
              .slice()
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((notif) => (
                <article className="notification">
                  <div>
                    <strong>{notif.userName}</strong> {notif.commentType}
                  </div>
                  <p className="notification__caption">{notif.caption}</p>
                  <span className="notification__time">
                    <TimeAgo timeStamp={notif.date} />
                  </span>
                </article>
              ))}
          </section>
        </div>
      )}
      {status === "failed" && <div>Something went wrong! try again!!</div>}
    </div>
  );
};
