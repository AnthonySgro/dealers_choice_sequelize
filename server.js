//express setup
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4500;
const path = require("path");

//database
const {
    db,
    seed,
    model: { Song, Artist, Album },
} = require("./db");
seed();

//views
const homepage = path.join(__dirname, "..", "public/index.html");

//logger
const morgan = require("morgan");
app.use(morgan("dev"));

//parsing requests
app.use(require("body-parser").json());
app.use(express.urlencoded({ extended: false }));

//client side static
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.static("public"));

//routes
app.get("/", async (req, res) => {
    try {
        await res.sendFile(homepage);
    } catch (err) {
        console.log(err);
    }
});

app.post("/:songid", async (req, res) => {
    try {
        await Song.deleteByPk(req.params.songid);
        await res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/artists", async (req, res, next) => {
    try {
        res.send(await Artist.findAll());
    } catch (err) {
        console.log(err);
    }
});
app.get("/api/albums", async (req, res, next) => {
    try {
        res.send(
            await Album.findAll({
                include: {
                    model: Artist,
                },
            }),
        );
    } catch (err) {
        next(err);
    }
});

app.get("/api/songs", async (req, res, next) => {
    try {
        res.send(
            await Song.findAll({
                include: {
                    model: Album,
                    include: {
                        model: Artist,
                    },
                },
            }),
        );
    } catch (err) {
        next(err);
    }
});

app.get("/api/just_songs", async (req, res, next) => {
    try {
        res.send(
            await Song.findAll({
                include: {
                    model: Album,
                },
                order: [["songNum", "ASC"]],
            }),
        );
    } catch (err) {
        next(err);
    }
});

app.get("/api/artists/:artistId/albums", async (req, res, next) => {
    try {
        console.log(req.params.artistId);
        res.send(
            await Album.findAll({
                where: { artistId: req.params.artistId },
            }),
        );
    } catch (ex) {
        console.log(req.params);
        next(ex);
    }
});

app.use("", async (err, req, res, next) => {
    if (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`);
});
