const router = require("express").Router();
let Movie = require("../../models/movie.model");

router.route("/").get((req, res) => {
  Movie.aggregate([{ $sample: { size: 1000 } }])
    .then(movie => res.send(movie))
    .catch(err => res.status(400).json("movies.js: 1st router Error: " + err));
});

router.route("/add").post((req, res) => {
  const titleId = req.body.titleId;
  const name = req.body.name;
  const reviews_num = req.body.reviews_num;
  const signature = req.body.signature;
  const signature_per = req.body.signature_per;
  const signature_percentile = req.body.signature_percentile;
  const signature_zscore = req.body.signature_zscore;
  const tsne_glyph = req.body.tsne_glyph;
  const plot = req.body.plot;
  const movie_rating = req.body.movie_rating;
  const movie_directors = req.body.movie_directors;
  const movie_writers = req.body.movie_writers;
  const movie_stars = req.body.movie_stars;
  const movie_genres = req.body.movie_genres;
  const release_year = req.body.release_year;
  const poster = req.body.poster;

  /*
  const rssa_id = req.body.rssa_id;
  const movie_id = req.body.movie_id;
  const imdb_id = req.body.imdb_id;
  const title = req.body.title;
  const year = req.body.year;
  const runtime = req.body.runtime;
  const genre = req.body.genre;
  const aveRating = req.body.aveRating;
  const director = req.body.director;
  const writer = req.body.writer;
  const description = req.body.description;
  const cast = req.body.cast;
  const poster = req.body.poster;
*/
  const newMovie = new Movie({ 
    titleId,
    name,
    reviews_num,
    signature,
    signature_per,
    signature_percentile,
    signature_zscore,
    tsne_glyph,
    plot,
    movie_rating,
    movie_directors,
    movie_writers,
    movie_stars,
    movie_genres,
    release_year,
    poster
    
/*
    rssa_id,
    movie_id,
    imdb_id,
    title,
    year,
    runtime,
    genre,
    aveRating,
    director,
    writer,
    description,
    cast,
    poster
    */
  });

  newMovie
    .save()
    .then(() => res.json("Movie added!"))
    .catch(err => res.status(400).json("movies.js: new Movie Error: " + err));
});

router.route("/:titleId").get((req, res) => {
  Movie.find({ titleId: req.params.titleId })
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json("movies.js: Router Error: " + err));
});

// router.route("/:id").get((req, res) => {
//   Movie.findById(req.params.id)
//     .then(movie => res.json(movie))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/:id").delete((req, res) => {
//   Movie.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Movie deleted."))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/update/:id").post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(movie => {
//       movie.rssa_id = Number(req.body.rssa_id);
//       movie.movie_id = Number(req.body.movie_id);
//       movie.imdb_id = Number(req.body.imdb_id);
//       movie.title = req.body.title;
//       movie.year = Number(req.body.year);
//       movie.runtime = Number(req.body.runtime);
//       movie.genre = req.body.genre;
//       movie.aveRating = Number(req.body.aveRating);
//       movie.director = req.body.director;
//       movie.writer = req.body.writer;
//       movie.description = req.body.description;
//       movie.cast = req.body.cast;
//       movie.poster = req.body.poster;

//       movie
//         .save()
//         .then(() => res.json("Movie updated!"))
//         .catch(err => res.status(400).json("Error: " + err));
//     })
//     .catch(err => res.status(400).json("Error: " + err));
// });

module.exports = router;
