let songs = [];  // All songs
let queue = [];  // Player queue

fetch("songs.json")
  .then(res => res.json())
  .then(data => {
    // Auto-generate IDs and add default cover
    songs = data.map((s, i) => ({
      id: i + 1,
      title: s.title,
      artist: s.artist || "Unknown",
      src: s.url,
      cover: "assets/images/default.jpg"
    }));

    queue = [...songs];       // fill player queue
    renderSongList();         // render first chunk
  })
  .catch(err => console.error("Error loading songs.json:", err));
