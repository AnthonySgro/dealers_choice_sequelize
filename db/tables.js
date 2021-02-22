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
        songNum: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: "songs",
    },
);

Song.deleteByPk = async (id) => {
    try {
        await Song.destroy({
            where: {
                id: id,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

Song.findByInfo = async (name, songNum, album) => {
    try {
        const song = await Song.findOne({
            where: {
                name: name,
                songNum: songNum,
                albumId: album.id,
            },
        });
        return song;
    } catch (err) {
        console.log(err);
    }
};

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

Album.findByInfo = async (name, year, artistEntry) => {
    try {
        const album = await Album.findOne({
            where: {
                name: name,
                year: year,
                artistId: artistEntry.id,
            },
        });
        return album;
    } catch (err) {
        console.log(err);
    }
};

Album.deleteByPk = async (id) => {
    try {
        await Album.destroy({
            where: {
                id: id,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

Album.addDatabaseEntry = async (entry) => {
    try {
        //figuring out if artist is new and adding it if so
        let newArtist = await Artist.findByName(entry.artistName);
        if (!newArtist) {
            newArtist = await Artist.create({
                name: entry.artistName,
            });
        }

        //same with album
        let newAlbum = await Album.findByInfo(
            entry.albumName,
            entry.albumYear,
            newArtist,
        );
        if (!newAlbum) {
            newAlbum = await Album.create({
                name: entry.albumName,
                year: entry.albumYear,
                artistId: newArtist.id,
            });
        }

        //do tracks in an array
        const newTracks = await Promise.all(
            entry.trackNames.map(async (name, i) => {
                let exists = await Song.findByInfo(name, i + 1, newAlbum);
                if (!exists) {
                    await Song.create({
                        name: name,
                        songNum: i + 1,
                        albumId: newAlbum.id,
                    });
                }
            }),
        );

        //returns entry
        return { newArtist, newAlbum, newTracks };
    } catch (err) {
        console.log(err);
    }
};

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

Artist.findByName = async (name) => {
    try {
        const artist = await Artist.findOne({
            where: {
                name: name,
            },
        });
        return artist;
    } catch (err) {
        console.log(err);
    }
};

Song.belongsTo(Album);
Album.hasMany(Song);

Album.belongsTo(Artist);
Artist.hasMany(Album);

module.exports = { model: { Song, Artist, Album } };
