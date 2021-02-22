const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("./db");
const seed = require("./seed");
const {
    model: { Song, Artist, Album },
} = require("./tables");

module.exports = {
    db,
    seed,
    model: { Song, Artist, Album },
};
