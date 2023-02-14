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
        "Title": "The Conjuring",
        "Description": "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse",
        "Genre": {
            "Name": "Horror",
            "Description": "Horror is a film genre that seeks to scare, startle, and repulse its audiences."
        },
        "Director": {
            "Name": "James Wan",
            "Bio": "James Wan was born on February 26, 1977 in Melbourne, Australia. He is an Australian film producer, screenwriter, and film director of Malaysian Chinese descent. Wan is widely known for directing the horror film Saw(2004) and creating Billy the puppet. Saw(2004) ended up grossing up $55 million dollars in America, and $48 million dollars in other countries, totaling over $103 million worldwide."
        },
        "Image":"https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_FMjpg_UX1000_.jpg",
        "Featured": true
    }, 
    {
        "Title": "The Sixth Sense",
        "Description": "A frightened, withdrawn Philadelphia boy who communicates with spirits seeks the help of a disheartened child psychologist.",
        "Genre": {
            "Name": "Thriller",
            "Description": "Thriller is a film genre of fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction."
        },
        "Director": {
            "Name": "M. Night Shyamalan",
            "Bio": "Born in Pudcherry, India, and raised in the post suburban Penn Valley area of Philadelphia, Pennsylvannia, M. Night Shyamalan is a film director, screenwriter, producer, and occasional actor, known for making movies with contemporary supernatural plots."
        },
        "Image":"https://upload.wikimedia.org/wikipedia/en/a/a4/The_Sixth_Sense_poster.png",
        "Featured": false
    }, 
    {
        "Title": "The Exorcist",
        "Description": "When a teenage girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her daughter.",
        "Genre": {
            "Name": "Horror",
            "Description": "Horror is a film genre that seeks to scare, startle, and repulse its audiences."
        },
        "Director": {
            "Name": "Willaim Friedkin",
            "Bio": "William Friedkin was born on August 29, 1935 to Loise and Rae Friedkin in Chicago, Illinois. At a young age, Friedkin became infatuated with Orson Welles after seeing Citizen Kane(1941). He went to work for WGN TV immediately after graduating from high school where he started making documentaries, one of which won the Golden Gate Award at the 1962 San Francisco film festival."
        },
        "Image":"https://m.media-amazon.com/images/M/MV5BYWFlZGY2NDktY2ZjOS00ZWNkLTg0ZDAtZDY4MTM1ODU4ZjljXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        "Featured": true
    }
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

/* Allows user to search genre definition */
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