



This web apps is final project to my ReactJS program course on Sanbercode © and the program is to CRUD movie and games (moogames), and the REST API is from their own server.

I also added a few more small feature as a cherry on top of it. 

The following is to guide readers to the [Moogames App](https://morning-hollows-84886.herokuapp.com/)

## Running it in your local server

For my own convenience, I didn't add the public IP address so readers CANNOT freely clone the project and run it own their system as it is.

So first of all, if readers intent to clone/download this repo and meant to run it on their machine, readers can execute 

### `npm install`

on both of the package.json file that is already included in this repository. Then, readers can add the ./dev.js on the same file as the ./prod.js with the config as follows:


### `registerURI: "https://backendexample.sanbersy.com/api/register"`

### `loginURI: "https://backendexample.sanbersy.com/api/user-login"`

### `gameURI: "https://backendexample.sanbersy.com/api/data-game"`

### `movieURI: "https://backendexample.sanbersy.com/api/data-movie"`

### `changePasswordURI: "https://backendexample.sanbersy.com/api/change-password"`


AND, this one is important, readers SHOULD add their own Mongo URI with their mongodb account and collect their connect setup for this program to work.

You can look up how to set up a database on MongoDB and/or connecting the database to this app. This is how it should look like on the ./dev.js file:

### `mongoURI: "mongodb+srv://<your_username>:<your_password>@maincluster0.zltc7.mongodb.net/moogabes?retryWrites=true&w=majority"`


and the, run the app in the development mode with 

### `npm run dev` on the /server directory

The page will reload AUTOMATICALLY when you make changes.

You may also see any lint errors in the console.

ENJOY!