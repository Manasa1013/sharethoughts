## Social media app using React-redux

#### An app built showcasing pieces of social media app , using React-redux , focused on learning React-redux with this app.

### Technologies

- React-Redux
- Node and express - API server
- HTML , CSS .

### Functionalities

- A social media app ( More functionalities will be added later)

* User can view everyone's posts, react to them.
* User can add new posts and this is saved into server.
* Each post can be viewed in seperate single pages for better visibility.
* The previous posts are fetched from the server.
* User can edit the posts , not saved onto server yet, (will be added later).

### Thunk middleware in fetching data

- Used createAsyncThunk API to fetch data and post data onto server.

* Data fetching status is also obtained from the extraReducers of respective slices.
* Three slices are created in store for posts, users and notifications.
