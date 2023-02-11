const express = require("express");
morgan = require("morgan");  //logging requests
const app = express();
app.use(morgan("common"));

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

/* HTTP requests */

app.get("/", (req, res) => {
    res.send("Welcome to ParaFlix!")
});

app.get("/movies", (req, res) => {
    res.json(paraMovies);
});

/* HTTP requests */

app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});