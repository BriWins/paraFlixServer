const express = require("express");
morgan = require("morgan");  //logging requests
bodyParser = require("body-parser");
uuid = require("uuid");

const app = express();
app.use(morgan("common"));
app.use(express.static('public')); //serves static file
app.use(bodyParser.json());


let paraMovies = [
    {
        title: "The Exorcist",
        director: "William Friedkin"
    },
    {
        title: "The Conjuring",
        director: "James Wan"
    },
    {
        title: "Poltergeist",
        director: "Tobe Hooper"
    },
];

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
    const movie = paraMovies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("no such movie");
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