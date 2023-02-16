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
    }, 
    {
        "Title": "Insidious(I) 2010",
        "Description": "A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further.",
        "Genre": {
            "Name": "Mystery",
            "Description": "Mystery is genre of film that revolves around a puzzling crime, situation, or circumstance."
        },
        "Director": {
            "Name": "James Wan",
            "Bio": "James Wan was born on February 26, 1977 in Melbourne, Australia. He is an Australian film producer, screenwriter, and film director of Malaysian Chinese descent. Wan is widely known for directing the horror film Saw(2004) and creating Billy the puppet. Saw(2004) ended up grossing up $55 million dollars in America, and $48 million dollars in other countries, totaling over $103 million worldwide."
        },
        "Image": "https://m.media-amazon.com/images/M/MV5BMTYyOTAxMDA0OF5BMl5BanBnXkFtZTcwNzgwNTc1NA@@._V1_.jpg",
        "Featured": false
    },
    {
        "Title": "The Devil's Backbone (2001)",
        "Description": "After Carlos- a 12-year-old whose father has died in the Spanish Civil War arrives at an ominous boys' orphanage, he discovers the school is haunted and has many dark secrets which he must uncover.",
        "Genre": {
            "Name": "Thriller",
            "Description": "Thriller is a film genre of fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction."
        },
        "Director": {
            "Name": "Guillermo del Toro",
            "Bio": "Del Toro was born October 9, 1964 in Guadalajara, Jalisco, Mexico. He developed an interest in filmaking in his early teens. At the age of 21, del Toro produced his first feature, Dona Herlinda and Her Son (1985)."
        },
        "Image": "https://m.media-amazon.com/images/M/MV5BMTgzMDgwMTg2OV5BMl5BanBnXkFtZTYwMzAxNTQ5._V1_.jpg",
        "Featured": false
    },
    {
        "Title": "The Awakening",
        "Description": "In 1921, England is overwhelmed by the loss and grief of World War I. Hoax exposer Florence Cathcart visits a boarding school to explain sightings of a child ghost. Everything she believes unravels as the 'missing' begin to show themselves.",
        "Genre": {
            "Name": "Horror",
            "Description": "Horror is a film genre that seeks to scare, startle, and repulse its audiences."
        },
        "Director": {
            "Name": "Nick Murphy",
            "Bio": "Nick Murphy is a BAFTA winning and Royal Television Society Award winning director and writer. He was born and grew up in Merseyside, NW England. A former editor of news and current affairs for the BBC, he began directing documentaries in 1996. A decade later he moved into writing and directing dramas, receiving multiple awards and nominations both at home and abroad."
        },
        "Image": "https://m.media-amazon.com/images/M/MV5BMzk0ODc1NDMxOV5BMl5BanBnXkFtZTcwNTAzMzgwOA@@._V1_.jpg",
        "Featured": true
    },
    {
        "Title": "Dark Floors",
        "Description": "A man emerges with his autistic daughter and three others from a hospital elevator to find themselves trapped in the building with devilish monsters.",
        "Genre": {
            "Name": "Fantasy",
            "Description": "Fantasy is a film genre that usually involves magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
        },
        "Director": {
            "Name": "Pete Riski",
            "Bio": "Pete Riski was born on January 9, 1974 in Rovaniemi, Finland. He is a director and editor, known for Bullets (2018), A Good Family (2022) and Uni (2021)."
        },
        "Image": "https://m.media-amazon.com/images/M/MV5BYzE2NTE2YmItY2NiMC00MmIwLWE5NTktM2Q5YmIzZGIyZWRjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        "Featured": false
    },
    {
        "Title": "The Orphanage",
        "Description": "A woman brings her family back to her childhood home, which used to be an orphanage for disabled children. Before long, her son starts to communicate with an invisible new friend.",
        "Genre": {
            "Name": "Mystery",
            "Description": "Mystery is genre of film that revolves around a puzzling crime, situation, or circumstance."
        },
        "Director": {
            "Name": "J.A. Bayona",
            "Bio": "Juan Antonio García Bayona is a Spanish film director. He directed the 2007 horror film The Orphanage, the 2012 drama film The Impossible, and the 2016 fantasy drama film A Monster Calls. Bayona's latest film is the 2018 science fiction adventure film Jurassic World: Fallen Kingdom, the fifth installment of the Jurassic Park film series. He has also directed television commercials and music videos."
        },
        "Image": "https://m.media-amazon.com/images/M/MV5BMTY0NDMyNDM0Nl5BMl5BanBnXkFtZTcwNTY1MTY2MQ@@._V1_.jpg",
        "Featured": false
    },
    {
        "Title": "The Amityville Horror",
        "Description": "Newlyweds are terrorized by demonic forces after moving into a large house that was the site of a grisly mass murder a year before.",
        "Genre": {
            "Name": "Horror",
            "Description": "Horror is a film genre that seeks to scare, startle, and repulse its audiences."
        },
        "Director": {
            "Name": "Andrew Douglas",
            "Bio": "British director Andrew Douglas began his career in Antony Armstrong-Jones Snowdon's photographic studio. He was a magazine photographer for Esquire and The Face and then a director of music videos and commercials. His 2003 documentary, Searching for the Wrong-Eyed Jesus, won a Royal Television Society award. He made his movie debut with The Amityville Horror (2005), the terrifying remake of the 1970s horror classic."
        },
        "Image": "https://m.media-amazon.com/images/M/MV5BNzhlMzJkNzgtNDljNS00ZWY1LTg2ZjMtMTUxM2ExNWFlZTAyXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_FMjpg_UX1000_.jpg",
        "Featured": true
    },
    {
        "Title": "The Innocents",
        "Description": "During the bright Nordic summer, a group of children reveal mysterious powers. But what starts out innocent soon takes a dark and violent turn in this gripping supernatural thriller.",
        "Genre": {
            "Name": "Fantasy",
            "Description": "Fantasy is a film genre that usually involves magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
        },
        "Director": {
            "Name": "Eskil Vogt",
            "Bio": "Eskil Vogt was born on October 31, 1974 in Oslo, Norway. He is a writer and director, known for The Worst Person in the World (2021), The Innocents (2021) and Thelma (2017)."
        },
        "Image": "https://m.media-amazon.com/images/M/MV5BNDgwNGFmMDMtNGQzMC00Mjc2LWFhNzItYWIxMGJlM2Q2MzZlXkEyXkFqcGdeQXVyODA0MjgyNzM@._V1_.jpg",
        "Featured": false
    },
];

let user = [
    {
        id: 1,
        name: "Brianna",
        favoriteMovies: []
    }, 
    {
        id: 2,
        name: "Emily",
        favoriteMovies: []
    }, 
    {
        id: 3,
        name: "Sally",
        favoriteMovies: []
    }
]

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