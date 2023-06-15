import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

export const TimeAgo = ({ timeStamp }) => {
  let timeAgo = "";
  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} `;
  }

  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo} ago</i>
    </span>
  );
};
