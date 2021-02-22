const db = require("./db");
const {
    model: { Song, Artist, Album },
} = require("./tables");

const seed = async () => {
    try {
        await db.sync({ force: true });
        console.log("Connected to Database!");
        const metroBoomin = await Artist.create({ name: "Metro Boomin" });
        const frenchMontana = await Artist.create({ name: "French Montana" });
        const mister16 = await Album.create({
            name: "Mister 16: Casino Life",
            year: 2011,
            artistId: frenchMontana.id,
        });
        const gucciMane = await Artist.create({ name: "Gucci Mane" });
        const eastAtlantaSanta = await Album.create({
            name: "East Atlanta Santa",
            year: 2014,
            artistId: gucciMane.id,
        });
        const travisScott = await Artist.create({ name: "Travis Scott" });
        const daysBeforeRodeo = await Album.create({
            name: "Days Before Rodeo",
            year: 2014,
            artistId: travisScott.id,
        });
        const future = await Artist.create({ name: "Future" });
        const ds2 = await Album.create({
            name: "DS2",
            year: 2015,
            artistId: future.id,
        });
        const rodeo = await Album.create({
            name: "Rodeo",
            year: 2015,
            artistId: travisScott.id,
        });
        const savage21 = await Artist.create({ name: "21 Savage" });
        const savageMode = await Album.create({
            name: "Savage Mode",
            year: 2016,
            artistId: savage21.id,
        });
        const freeBricks = await Album.create({
            name: "Free Bricks 2k16",
            year: 2016,
            artistId: future.id,
        });
        const theWeeknd = await Artist.create({
            name: "The Weeknd",
        });
        const starboy = await Album.create({
            name: "Starboy",
            year: 2016,
            artistId: theWeeknd.id,
        });
        const bigSean = await Artist.create({
            name: "Big Sean",
        });
        const iDecided = await Album.create({
            name: "I Decided.",
            year: 2017,
            artistId: bigSean.id,
        });
        const futureAlbum = await Album.create({
            name: "Future",
            year: 2017,
            artistId: future.id,
        });
        const issaAlbum = await Album.create({
            name: "Issa Album",
            year: 2017,
            artistId: savage21.id,
        });
        const offset = await Artist.create({
            name: "Offset",
        });
        const withoutWarning = await Album.create({
            name: "Without Warning",
            year: 2017,
            artistId: offset.id,
        });
        const doubleOrNothing = await Album.create({
            name: "Double Or Nothing",
            year: 2017,
            artistId: bigSean.id,
        });
        const gunna = await Artist.create({
            name: "Gunna",
        });
        const dripSeason3 = await Album.create({
            name: "Drip Season 3",
            year: 2018,
            artistId: gunna.id,
        });
        const fatherOfFour = await Album.create({
            name: "Father Of 4",
            year: 2019,
            artistId: offset.id,
        });
        const afterHours = await Album.create({
            name: "After Hours",
            year: 2020,
            artistId: theWeeknd.id,
        });
        const savageMode2 = await Album.create({
            name: "Savage Mode II",
            year: 2020,
            artistId: savage21.id,
        });
        const notAllHeroes = await Album.create({
            name: "Not All Heroes Wear Capes",
            year: 2018,
            artistId: metroBoomin.id,
        });

        await Promise.all(
            [
                ["Everything's A Go", 1, mister16.id],
                ["Cadillac Doors (Me & U)", 12, mister16.id],
                ["Riding Dirty", 12, eastAtlantaSanta.id],
                ["Mamacita", 2, daysBeforeRodeo.id],
                ["Skyfall", 6, daysBeforeRodeo.id],
                ["Basement Freestyle", 9, daysBeforeRodeo.id],
                ["BACC", 12, daysBeforeRodeo.id],
                ["Thought It Was a Drought", 1, ds2.id],
                ["I Serve the Base", 2, ds2.id],
                ["Where Ya At", 3, ds2.id],
                ["Groupies", 4, ds2.id],
                ["Lil One", 5, ds2.id],
                ["Freak Hoe", 7, ds2.id],
                ["Rotation", 8, ds2.id],
                ["Slave Master", 9, ds2.id],
                ["Blow a Bag", 10, ds2.id],
                ["Rich Sex", 12, ds2.id],
                ["Blood on the Money", 13, ds2.id],
                ["Pornography", 1, rodeo.id],
                ["3500", 3, rodeo.id],
                ["Wasted", 4, rodeo.id],
                ["Nightcrawler", 7, rodeo.id],
                ["Ok Alright", 15, rodeo.id],
                ["No Advance", 1, savageMode.id],
                ["No Heart", 2, savageMode.id],
                ["X", 3, savageMode.id],
                ["Savage Mode", 4, savageMode.id],
                ["Bad Guy", 5, savageMode.id],
                ["Real N*gga", 6, savageMode.id],
                ["Mad High", 7, savageMode.id],
                ["Feel It", 8, savageMode.id],
                ["Ocean Drive", 9, savageMode.id],
                ["Die a Gangster", 3, freeBricks.id],
                ["All Shooters", 5, freeBricks.id],
                ["Six Feet Under", 10, starboy.id],
                ["Bounce Back", 2, iDecided.id],
                ["Voices in My Head", 10, iDecided.id],
                ["Sacrifices", 13, iDecided.id],
                ["Mask Off", 7, futureAlbum.id],
                ["Scrap", 10, futureAlbum.id],
                ["Famous", 1, issaAlbum.id],
                ["Bank Account", 2, issaAlbum.id],
                ["Close My Eyes", 3, issaAlbum.id],
                ["Thug Life", 6, issaAlbum.id],
                ["Nothin New", 8, issaAlbum.id],
                ["Numb", 9, issaAlbum.id],
                ["Money Convo", 11, issaAlbum.id],
                ["Whole Lot", 13, issaAlbum.id],
                ["7 Min Freestyle", 14, issaAlbum.id],
                ["Ghostface Killers", 1, withoutWarning.id],
                ["Rap Saved Me", 2, withoutWarning.id],
                ["Ric Flair Drip", 3, withoutWarning.id],
                ["My Choppa Hate N*ggas", 4, withoutWarning.id],
                ["Nightmare", 5, withoutWarning.id],
                ["Mad Stalkers", 6, withoutWarning.id],
                ["Disrespectful", 7, withoutWarning.id],
                ["Run Up the Racks", 8, withoutWarning.id],
                ["Still Serving", 9, withoutWarning.id],
                ["Darth Vader", 10, withoutWarning.id],
                ["Go Legend", 1, doubleOrNothing.id],
                ["Big Bidness", 2, doubleOrNothing.id],
                ["Who's Stopping Me", 3, doubleOrNothing.id],
                ["Pull Up N Wreck", 4, doubleOrNothing.id],
                ["So Good", 5, doubleOrNothing.id],
                ["Savage Time", 6, doubleOrNothing.id],
                ["Even the Odds", 7, doubleOrNothing.id],
                ["In Tune", 8, doubleOrNothing.id],
                ["Reason", 9, doubleOrNothing.id],
                ["No Hearts, No Love", 10, doubleOrNothing.id],
                ["Helluva Price", 1, dripSeason3.id],
                ["Pedestrian", 7, dripSeason3.id],
                ["Car Sick", 10, dripSeason3.id],
                ["My Soul", 11, dripSeason3.id],
                ["No Joke", 12, dripSeason3.id],
                ["Father of 4", 1, fatherOfFour.id],
                ["How Did I Get Here", 2, fatherOfFour.id],
                ["Tats on My Face", 4, fatherOfFour.id],
                ["Wild Wild West", 6, fatherOfFour.id],
                ["North Star", 7, fatherOfFour.id],
                ["After Dark", 8, fatherOfFour.id],
                ["Don't Lose Me", 9, fatherOfFour.id],
                ["Underrated", 10, fatherOfFour.id],
                ["On Fleek", 13, fatherOfFour.id],
                ["Quarter Milli", 14, fatherOfFour.id],
                ["Red Room", 15, fatherOfFour.id],
                ["Escape from LA", 6, afterHours.id],
                ["Heartless", 7, afterHours.id],
                ["faith", 8, afterHours.id],
                ["Until I Bleed Out", 14, afterHours.id],
                ["Intro", 1, savageMode2.id],
                ["Runnin", 2, savageMode2.id],
                ["Glock in My Lap", 3, savageMode2.id],
                ["Mr. Right Now", 4, savageMode2.id],
                ["Rich N*gga Shit", 5, savageMode2.id],
                ["Slidin", 6, savageMode2.id],
                ["Many Men", 7, savageMode2.id],
                ["Snitches & Rats (Interlude)", 8, savageMode2.id],
                ["Snitches & Rats", 9, savageMode2.id],
                ["My Dawg", 10, savageMode2.id],
                ["Steppin on N*ggas", 11, savageMode2.id],
                ["Brand New Draco", 12, savageMode2.id],
                ["No Opp Left Behind", 13, savageMode2.id],
                ["RIP Luv", 14, savageMode2.id],
                ["Said N Done", 15, savageMode2.id],
                ["10AM / Save the World", 1, notAllHeroes.id],
                ["Overdue", 2, notAllHeroes.id],
                ["Don't Come Out the House", 3, notAllHeroes.id],
                ["Dreamcatcher", 4, notAllHeroes.id],
                ["Space Cadet", 5, notAllHeroes.id],
                ["10 Freaky Girls", 6, notAllHeroes.id],
                ["Up to Something", 7, notAllHeroes.id],
                ["Only 1 (Interlude)", 8, notAllHeroes.id],
                ["Lesbian", 9, notAllHeroes.id],
                ["Borrowed Love", 10, notAllHeroes.id],
                ["Only You", 11, notAllHeroes.id],
                ["No More", 12, notAllHeroes.id],
                ["No Complaints", 13, notAllHeroes.id],
            ].map((song) => {
                Song.create({
                    name: song[0],
                    songNum: song[1],
                    albumId: song[2],
                });
            }),
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports = seed;
