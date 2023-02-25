const express = require("express");
bodyParser = require("body-parser");
uuid = require("uuid");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;
const morgan = require("morgan");  //logging requests

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");

let auth = require("./auth")(app);
const passport = require("passport");
require("./passport.js");
app.use(morgan("common"));
app.use(express.static('public')); //serves static file


// mongoose.connect('mongodb://127.0.0.1:27017/paraFlixDB');
mongoose.connect(
    process.env.CONNECTION_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)

let allowedOrigins = ["http://localhost:8080"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1) {
            let message = "The CORS policy for this application doesn't allow access from origin " + origin;
            return callback( new Error(message), false);
        }
        return callback(true, null);
    }
}));

/* Users can register account */
app.post("/users", [
    check("Username", "Username is required").isLength({min: 5}),
    check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required and must be at least eight characters ong.").isLength({min: 8}),
    check("Email", "Email does not appear to be valid").isEmail()
], (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }

    let hashedPassword = Users.hashedPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + "already exists!");
            } else {
                Users.create({
                    Username: req.body.Username,
                    Password: hashedPassword,
                    Email: req.body.Email,
                    Birthdate: req.body.Birthdate,
                }).then((user) => {
                    res.status(201).json(user)
                }).catch((error) => {
                    console.log(error);
                    res.status(500).send("Error: " + error);
                })
            }
        }).catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error );
        });
});

/* User can update their info */
app.put("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
   Users.findOneAndUpdate({ Username: req.params.Username }, 
    {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthdate: req.body.Birthdate,
        }
    },
    {new: true},
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    })
});

/* User can add a movie */
app.post("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { 
        $push: { FavoriteMovies: req.params.MovieID }
    },
    {new: true},
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    })
});

/* User can remove a movie from their list */
app.delete("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { 
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    {new: true},
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    })
});


/* User can delete their account */
app.delete("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send("Username " + req.params.Username + " was not found");
            } else {
                res.status(200).send("Username " + req.params.Username + " was deleted");
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
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
app.get("/movies", passport.authenticate("jwt", { session: false }), (req, res) => {
   Movies.find()
    .then((movies) => {
        res.status(201).json(movies);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/* Allows user to search movie by title */
app.get("/movies/:Title", passport.authenticate("jwt", { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
        res.status(200).json(movie);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/* Allows user to filter movies by genre */
app.get("/movies/genre/:genreName", passport.authenticate("jwt", { session: false }), (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((movies) => {
        res.json(movies.Genre);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/* Allows user to search director by name */
app.get("/movies/directors/:directorName", passport.authenticate("jwt", { session: false }), (req, res) => {
    Movies.findOne({ "Director.Name": req.params.directorName })
    .then((movie) => {
        res.json(movie.Director);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/* Error handling function */
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something is not right!");
});

/* Listening for requests */
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
    console.log("Listening on Port " + port);
});




