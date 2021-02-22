//express setup
const express = require("express");
const router = express.Router();

//database
const {
    model: { Song, Artist, Album },
} = require("../db");

router.get("/artists", async (req, res, next) => {
    try {
        res.send(await Artist.findAll());
    } catch (err) {
        console.log(err);
    }
});

router.get("/albums", async (req, res, next) => {
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

router.get("/songs", async (req, res, next) => {
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

router.get("/just_songs", async (req, res, next) => {
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

router.get("/artists/:artistId/albums", async (req, res, next) => {
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

module.exports = router;
