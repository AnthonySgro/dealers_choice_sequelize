//router setup
const express = require("express");
const router = express.Router();

//database
const {
    model: { Song, Artist, Album },
} = require("../db");

//views
const path = require("path");
const addpage = path.join(__dirname, "../public/add.html");

router.get("/", async (req, res) => {
    try {
        await res.status(200).sendFile(addpage);
    } catch (err) {
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    try {
        console.log("------------------asDFASDFADS------------");

        const artistName = req.body.artist;
        const albumName = req.body.albumName;
        const albumYear = req.body.albumYear;
        let trackNames = [];
        const numOfTracks = Object.keys(req.body).length - 3;
        for (let i = 0; i < numOfTracks; i++) {
            trackNames.push(Object.values(req.body)[i + 3]);
        }
        const dataObject = {
            artistName: artistName,
            albumName: albumName,
            albumYear: albumYear,
            trackNames: trackNames,
        };

        if (trackNames.length) {
            await Album.addDatabaseEntry(dataObject);
        }

        await res.status(201).sendFile(addpage);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
