const express = require("express");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/paraFlixDB", { useNewUrlParser: true, useUnifiedTopology: true });

morgan = require("morgan");  //logging requests
bodyParser = require("body-parser");
uuid = require("uuid");

const app = express();
app.use(morgan("common"));
app.use(express.static('public')); //serves static file
app.use(bodyParser.json());

/* Users can register account */
app.post("/users", (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send("users need names");
    }
});

/* User can update their info */
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send("no such user");
    }
});

/* User can add a movie */
app.post("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s list`);
        } else {
        res.status(400).send("no such user");
    }
});

/* User can remove a movie from their list */
app.delete("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s list`);
        } else {
        res.status(400).send("no such user");
    }
});

/* User can delete their account */
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id );
        res.status(200).send(`user ${id} has been deleted`);
        } else {
        res.status(400).send("no such user");
    }
});

/* Routes user to homepage */
app.get("/", (req, res) => {
    res.send("Welcome to ParaFlix!")
});

/* Routes developer to instructions */
app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { 
        root: __dirname
    });
});

/* Routes user to movie list array */
app.get("/movies", (req, res) => {
    res.status(200).json(paraMovies);
});

/* Allows user to search movie by title */
app.get("/movies/:title", (req, res) => {
    const { title } = req.params;
    const movie = paraMovies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("no such movie");
    }
});

/* Allows user to search genre definition */
app.get("/movies/genre/:genreName", (req, res) => {
    const { genreName } = req.params;
    const genre = paraMovies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send("no such genre");
    }
});

/* Allows user to search director by name */
app.get("/movies/directors/:directorName", (req, res) => {
    const { directorName } = req.params;
    const director = paraMovies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send("no such director");
    }
});

/* Error handling function */
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something is not right!");
});

/* Listening for requests */
app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});