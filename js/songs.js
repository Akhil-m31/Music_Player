let songs = [];  // will hold all songs from songs.json

fetch("songs.json")
  .then(res => res.json())
  .then(data => {
    songs = data.map((s, i) => ({
      id: i + 1,
      title: s.title,
      artist: s.artist || "Unknown",
      src: s.url,
      cover: "assets/images/default.jpg"
    }));
    queue = [...songs];  // update queue for player.js
    renderSongList();     // render the playlist
  })
  .catch(err => console.error("Error loading songs.json:", err));
