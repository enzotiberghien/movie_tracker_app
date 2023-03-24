const express = require("express")
const router = express.Router()
const { protect } = require("../middlewares/auth")
const { getMovies, setMovie, updateMovie, deleteMovie } = require("../controllers/movieController")

router.route("/").get(protect, getMovies).post(protect, setMovie)
router.route("/:id").put(protect, updateMovie).delete(protect, deleteMovie)

module.exports = router