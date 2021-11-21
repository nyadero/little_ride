// require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./models");

console.log({user: process.env.DB_USER});
console.log({password: process.env.DB_PASS});
console.log({database: process.env.DB_NAME});
console.log({host: process.env.DB_HOST});

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(fileUpload());

// static paths
app.use("/images", express.static("images"));

// routes
// users routes
const usersRoutes = require("./api/Routes/usersRoutes");
app.use("/users", usersRoutes);

// posts routes
const postsRoutes = require("./api/Routes/postsRoutes");
app.use("/posts", postsRoutes);

// comments routes
const commentsRoutes = require("./api/Routes/commentsRoutes");
app.use("/comments", commentsRoutes);

// likes routes
const likesRoute = require("./api/Routes/likesRoutes");
app.use("/likes", likesRoute)

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`app is listening to port: ${PORT}`);
    })
})