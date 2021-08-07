import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./app/Navbar";
import { Posts } from "./features/posts/Posts";
import { SinglePost } from "./features/posts/SinglePost";
import { EditPost } from "./features/posts/EditPost";
import "../src/index.css";
import { AddPost } from "./features/posts/AddPost";
import { Users } from "./features/users/Users";
import { UserPage } from "./features/users/UserPage";
import { NotificationsList } from "./features/notifications/NotificationsList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1 className="app-header">Social media</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <AddPost />
              <Posts />
            </React.Fragment>
          )}
        />
        <Route path={`/posts/:postID`} component={SinglePost} />
        <Route path={`/editPost/:postID`} component={EditPost} />
        <Route path={`/users/:userID`} component={UserPage} />
        <Route path={`/users`} component={Users} />
        <Route
          path={`/notifications`}
          render={() => (
            <React.Fragment>
              <NotificationsList />
            </React.Fragment>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
