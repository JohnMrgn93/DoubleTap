const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Drama",
      "Fantasy",
      "Science Fiction",
      "Thriller",
      "Romance",
      "Musical",
      "Documentary"
    ]
  },

  Rating: {
    type: String,
    required: true,
    enum: ["G", "PG", "PG-13", "R"]
  },

  type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },


const model = mongoose.model("Movies", MoviesSchema);

module.exports = Movies;
