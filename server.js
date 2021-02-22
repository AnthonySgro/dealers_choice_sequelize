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
const homepage = path.join(__dirname, "public/index.html");

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
const apiRouter = require("./routes/api");
const addRouter = require("./routes/add");

app.get("/", async (req, res) => {
    try {
        await res.status(200).sendFile(homepage);
    } catch (err) {
        console.log(err);
    }
});

app.post("/:songid", async (req, res) => {
    try {
        //song to be deleted
        const deletedSong = await Song.findOne({
            where: { id: req.params.songid },
        });

        //the tracks on the album of the deleted song
        const deletedSongTracklist = await Song.findAll({
            where: { albumId: deletedSong.albumId },
        });

        //and the album itself
        const deletedSongAlbum = await Album.findOne({
            where: { id: deletedSong.albumId },
        });

        //delete, and if last song on album, delete album too
        await Song.deleteByPk(req.params.songid);
        if (deletedSongTracklist.length === 1) {
            deletedSongAlbum.destroy();
        }

        //and the artist...
        const albumsFromArtist = await Album.findOne({
            where: { artistId: deletedSongAlbum.artistId },
        });

        //if artist has no albums, delete
        if (!albumsFromArtist) {
            const artist = await Artist.findOne({
                where: { id: deletedSongAlbum.artistId },
            });
            artist.destroy();
        }

        await res.status(204).redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.use("/add", addRouter);

app.use("/api", apiRouter);

app.use("", async (err, req, res, next) => {
    if (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`);
});
