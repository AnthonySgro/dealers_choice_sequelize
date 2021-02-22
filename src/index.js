import axios from "axios";

let artistList;
let albumList;
let songList;
let addBtn;
let removeBtn;

if (document.querySelector("#artist-list")) {
    artistList = document.querySelector("#artist-list");
    albumList = document.querySelector("#album-list");
    songList = document.querySelector("#song-list");
} else {
    addBtn = document.querySelector("#add-track");
    removeBtn = document.querySelector("#remove-track");
}

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
                    <p><span>${song.songNum}. &nbsp;</span>${song.name}</p>
                    <button class="small-btn">x</button>
                </form>
            </li>
            `,
        )
        .join("")}`;

    songList.innerHTML = html;
};

if (artistList) {
    renderArtists();
    renderAlbums();
    renderSongs();
}

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
        [...albumList.children].forEach((child) => {
            child.classList.remove("selected");
        });
        target.classList.add("selected");

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
    } else if (target === removeBtn) {
        const songInputs = [...document.querySelectorAll(".song-input")];
        if (songInputs.length === 0) {
            return;
        } else {
            const lastChild = songInputs[songInputs.length - 1];
            const songInputContainer = songInputs[0].parentNode;
            songInputContainer.removeChild(lastChild);
        }
    } else if (target === addBtn) {
        const songInputContainer = document.querySelector("#song-inputs");
        const newInput = document.createElement("INPUT");
        newInput.className = "song-input";
        newInput.type = "text";
        newInput.placeholder = `track ${
            songInputContainer.children.length + 1
        }`;
        newInput.name = `track_${songInputContainer.children.length + 1}`;
        songInputContainer.appendChild(newInput);
    }
});
