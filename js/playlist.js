const playlistList=document.getElementById("playlistList")
const newPlaylistBtn=document.getElementById("newPlaylist")

// Load playlists from localStorage or initialize
let playlists=JSON.parse(localStorage.getItem("playlists"))||{
"All Songs":[...songs]
}

// Save playlists to localStorage
function savePlaylists(){
    localStorage.setItem("playlists",JSON.stringify(playlists))
}

// Save updated song order for current playlist
function savePlaylistOrder(name){
    const liEls=document.querySelectorAll("#songList li")
    playlists[name]=Array.from(liEls).map(li=>{
        const idx=parseInt(li.querySelector("button").dataset.id)
        return queue[idx]
    })
    savePlaylists()
}

// Render playlists in sidebar
function renderPlaylists(){
    playlistList.innerHTML=""
    Object.keys(playlists).forEach(name=>{
        const li=document.createElement("li")
        li.textContent=name
        li.onclick=()=>{
            queue=[...playlists[name]]
            index=0
            renderSongList(queue)
            loadSong()
        }
        playlistList.appendChild(li)
    })
}

// Create new playlist
newPlaylistBtn.onclick=()=>{
    const name=prompt("Playlist name?")
    if(name && !playlists[name]){
        playlists[name]=[]
        savePlaylists()
        renderPlaylists()
        alert(`Playlist "${name}" created!`)
    }
}

// Add song to playlist
function addToPlaylist(song){
    const name=prompt("Add to which playlist?")
    if(playlists[name]){
        playlists[name].push(song)
        savePlaylists()
        alert(`Added "${song.title}" to "${name}"`)
    }else{
        alert("Playlist does not exist!")
    }
}

// Initial render
renderPlaylists()
