const path = require("path")
const express = require("express")
const dotenv = require("dotenv").config()
const cors = require('cors');
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000

connectDB()
const app = express()

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// User route
app.use("/api/users", require("../backend/routes/userRoute"))

// Movie route
app.use("/api/movies", require("../backend/routes/movieRoute"))

// Server front end
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")))
} else {
  app.get("/", (req, res) => res.send("Please set to production"))
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))