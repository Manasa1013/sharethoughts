import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

import { selectAuth } from "./authenticationSlice";

export function RequireAuth({ children }) {
  const auth = useSelector(selectAuth);
  console.log({ auth });
  const location = useLocation();
  if (auth.token) console.log(location, auth.token);
  return auth.token ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
