const playlistList=document.getElementById("playlistList")
const newPlaylistBtn=document.getElementById("newPlaylist")

let playlists=JSON.parse(localStorage.getItem("playlists"))||{
"All Songs":[...songs]
}

function savePlaylists(){
localStorage.setItem("playlists",JSON.stringify(playlists))
}

function renderPlaylists(){
playlistList.innerHTML=""
Object.keys(playlists).forEach(name=>{
const li=document.createElement("li")
li.textContent=name
li.onclick=()=>{
queue=[...playlists[name]]
index=0
loadSong()
}
playlistList.appendChild(li)
})
}

newPlaylistBtn.onclick=()=>{
const name=prompt("Playlist name?")
if(name && !playlists[name]){
playlists[name]=[]
savePlaylists()
renderPlaylists()
}
}

renderPlaylists()
