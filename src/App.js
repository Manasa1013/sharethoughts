import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

import "../src/index.css";
import { Toast } from "../src/features/toast/toast";
import { selectToast, hideToast, showToast } from "./features/toast/toastSlice";
import { Nav } from "./components/Nav";
import { RequireAuth } from "./features/authentication/RequireAuth";
import { Login } from "./pages/authentication/login";
import { Signup } from "./pages/authentication/signup";
import { Users } from "./features/oldusers/Users";

function App() {
  const toast = useSelector(selectToast);
  const dispatch = useDispatch();
  useEffect(() => {
    let timer = setTimeout(() => {
      if (toast.isVisible === "show") {
        dispatch(hideToast());
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.isVisible, dispatch]);
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <React.Fragment>
              <h1>Share thoughts</h1>
              <section>
                {" "}
                <button
                  type="button"
                  className="btn px-4 py-3 mx-2 my-4"
                  onClick={() => dispatch(showToast("Showing toast to test"))}
                >
                  Button
                </button>
                You can share thoughts ,it's a new version
              </section>
            </React.Fragment>
          }
        ></Route>
        <Route
          path="/users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/mockman" element={<Mockman />}></Route>

        <Route
          path="*"
          element={
            <React.Fragment>
              <h1>Share thoughts notifications</h1>
              <section> When you give any url,you view this</section>
            </React.Fragment>
          }
        ></Route>
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
