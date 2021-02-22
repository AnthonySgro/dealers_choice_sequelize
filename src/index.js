import axios from "axios";

const artistList = document.querySelector("#artist-list");
const albumList = document.querySelector("#album-list");
const songList = document.querySelector("#song-list");

const renderArtists = async () => {
    const artists = (await axios("/api/artists")).data;
    const html = `${artists
        .map(
            (artist) => `

            <li>
                <a href="#${artist.id}">${artist.name}</a>
            </li>
            `,
        )
        .join("")}`;

    artistList.innerHTML = html;
};

const renderAlbums = async (artistAlbums) => {
    if (!artistAlbums) {
        albumList.innerHTML = `<li class="default">
        Select an Artist
        </li>`;
        return;
    }
    const html = `${artistAlbums
        .map(
            (album) => `

            <li>
                ${album.name}
            </li>
            `,
        )
        .join("")}`;

    albumList.innerHTML = html;
};

const renderSongs = async (albumSongs) => {
    if (!albumSongs) {
        songList.innerHTML = `<li class="default">
        Click an Album
        </li>`;
        return;
    }

    const html = `${albumSongs
        .map(
            (song) => `

            <li>
                <form method="POST" action="/${song.id}">
                    (${song.songNum}) - ${song.name}
                    <button>X</button>
                </form>
            </li>
            `,
        )
        .join("")}`;

    songList.innerHTML = html;
};

renderArtists();
renderAlbums();
renderSongs();

window.addEventListener("hashchange", async () => {
    const artistId = await window.location.hash.slice(1);
    const URL = `/api/artists/${artistId}/albums`;
    const clickedArtistAlbums = (await axios.get(URL)).data;
    renderAlbums(clickedArtistAlbums);
    renderSongs();
});

window.addEventListener("click", async (ev) => {
    const target = ev.target;
    if (target.tagName === "LI" && target.parentNode === albumList) {
        const albumName = target.innerHTML.trim();
        const URL = `/api/just_songs`;
        const songs = (await axios.get(URL)).data;

        let clickedAlbumSongs = [];
        songs.forEach((song) => {
            if (song.album.name === albumName) {
                clickedAlbumSongs.push(song);
            }
        });
        renderSongs(clickedAlbumSongs);
    }
});
