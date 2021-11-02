const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emotionscollectionnew = new Schema({   
  titleId: { type: String},
  name: { type: String},
  reviews_num: { type: Number},
  signature: {
    anger: { type: Number},
    anticipation: { type: Number},
    disgust: { type: Number},
    fear: { type: Number},
    joy: { type: Number},
    negative: { type: Number},
    positive: { type: Number},
    sadness: { type: Number},
    surprise: { type: Number},
    trust: { type: Number},
  },
  signature_per: {
    anger: { type: Number},
    anticipation: { type: Number},
    disgust: { type: Number},
    fear: { type: Number},
    joy: { type: Number},
    negative: { type: Number},
    positive: { type: Number},
    sadness: { type: Number},
    surprise: { type: Number},
    trust: { type: Number}
  },
  signature_percentile: {
    anger: { type: Number},
    anticipation: { type: Number},
    disgust: { type: Number},
    fear: { type: Number},
    joy: { type: Number},
    negative: { type: Number},
    positive: { type: Number},
    sadness: { type: Number},
    surprise: { type: Number},
    trust: { type: Number}
  },
  signature_zscore: {
    anger: { type: Number},
    anticipation: { type: Number},
    disgust: { type: Number},
    fear: { type: Number},
    joy: { type: Number},
    negative: { type: Number},
    positive: { type: Number},
    sadness: { type: Number},
    surprise: { type: Number},
    trust: { type: Number}
  },
  tsne_glyph: {
    x: { type: Number},
    y: { type: Number}
  },
  plot: { type: String},
  movie_rating: { type: Number}, 
  movie_directors: { type: String},
  movie_writers: { type: String}, 
  movie_stars: { type: String}, 
  movie_genres: { type: String},
  release_year: { type: Number},  
  poster: { type: Buffer}
/*
  rssa_id: { type: String, required: true },
  movie_id: { type: String, required: true },
  imdb_id: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: String, required: true },
  runtime: { type: String, required: true },
  genre: { type: String, required: true },
  aveRating: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String, required: true },
  description: { type: String, required: true },
  cast: { type: String, required: true },
  poster: { type: String, required: true }
  */
},{collection: "emotionscollectionnew"});

const movie = mongoose.model("movie", emotionscollectionnew);

module.exports = movie;
