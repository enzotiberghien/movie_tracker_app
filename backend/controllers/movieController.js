const User = require("../models/userModel")
const Movie = require("../models/movieModel")
const asyncHandler = require("express-async-handler")


// @desc  Get movies
// @route GET/api/movies
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({ user: req.user.id })

  res.json(movies)
})

//  @desc add a movie
//  @route POST/api/movies
const setMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.create({
    user: req.user.id,
    title: req.body.title,
    rating: req.body.rating
  })

  res.status(200).json(movie)
})

//  @desc update a movie
//  @route PUT/api/movies/:id
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) {
    res.status(400)
    throw new Error("Movie not found")
  }

  const user = await User.findById(req.user.id)

  // Check for user
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the goal user
  if (movie.user.toString() != user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json(updatedMovie)
})

//  @desc add a movie
//  @route DELETE/api/movies/:id
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)

  if (!movie) {
    res.status(400)
    throw new Error("Movie not found")
  }


  const user = await User.findById(req.user.id)

  // Check for user
  if(!user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the goal user
  if(movie.user.toString() != user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await movie.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getMovies,
  setMovie,
  updateMovie,
  deleteMovie
}