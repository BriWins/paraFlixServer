const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

/* Defining movie array schema */
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    ImagePath: String,
    ReleaseYear: String,
    Featured: Boolean
});

/* Defining user array schema */
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthdate: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie"}]
});

userSchema.statics.hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
}

/* Creating models using schemas defined above */
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

/* Exporting the models */
module.exports.Movie = Movie;
module.exports.User = User;