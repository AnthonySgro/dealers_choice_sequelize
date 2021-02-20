const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("./db");

class Song extends Model {}
class Album extends Model {}
class Artist extends Model {}

Song.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: "songs",
    },
);

Album.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [4, 4],
            },
        },
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: "albums",
    },
);

Artist.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: "artists",
    },
);

Song.belongsTo(Artist);
Artist.belongsToMany(Song);

Song.belongsTo(Album);
Album.belongsToMany(Song);

Artist.belongsToMany(Album, { through: "AlbumArtist" });
Album.belongsToMany(Album, { through: "AlbumArtist" });

module.exports = { model: { Song, Artist, Album } };
