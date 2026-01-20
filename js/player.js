const audio=document.getElementById("audio")
const playBtn=document.getElementById("play")
const nextBtn=document.getElementById("next")
const prevBtn=document.getElementById("prev")
const shuffleBtn=document.getElementById("shuffle")
const repeatBtn=document.getElementById("repeat")
const volume=document.getElementById("volume")
const muteBtn=document.getElementById("mute")
const title=document.getElementById("title")
const artist=document.getElementById("artist")
const cover=document.getElementById("cover")
const songList=document.getElementById("songList")
const search=document.getElementById("search")

let queue=[]
let index=0
let isShuffle=false
let repeatMode=0

// ------------------- SONG LIST RENDER -------------------
function renderSongList(filteredSongs=queue){
    songList.innerHTML=""
    filteredSongs.forEach((s,i)=>{
        const li=document.createElement("li")
        li.draggable=true
        li.innerHTML=`${s.title} - ${s.artist} <button data-id="${i}">＋</button>`
        
        li.onclick=()=>{
            index=i
            loadSong()
        }

        li.querySelector("button").onclick=e=>{
            e.stopPropagation()
            addToPlaylist(s)
        }

        li.addEventListener("dragstart",()=>li.classList.add("dragging"))
        li.addEventListener("dragend",()=>li.classList.remove("dragging"))
        li.addEventListener("dragover",e=>{
            e.preventDefault()
            const dragging=document.querySelector(".dragging")
            const bounding=li.getBoundingClientRect()
            const offset=bounding.y+bounding.height/2
            const parent=songList
            if(e.clientY<offset){
                parent.insertBefore(dragging,li)
            }else{
                parent.insertBefore(dragging,li.nextSibling)
            }
        })

        songList.appendChild(li)
    })
}

// Initial render
renderSongList()

// ------------------- SEARCH FUNCTION -------------------
search.oninput=e=>{
    const term=e.target.value.toLowerCase()
    const filtered=queue.filter(s=>
        s.title.toLowerCase().includes(term) || s.artist.toLowerCase().includes(term)
    )
    renderSongList(filtered)
}

// ------------------- LOAD SONG -------------------
function loadSong(){
    const s=queue[index]
    audio.src=s.src
    title.textContent=s.title
    artist.textContent=s.artist
    cover.src=s.cover
    audio.play()
    playBtn.textContent="❚❚"
}

// ------------------- PLAYER BUTTONS -------------------
playBtn.onclick=()=>{
    if(audio.paused){
        audio.play()
        playBtn.textContent="❚❚"
    }else{
        audio.pause()
        playBtn.textContent="▶"
    }
}

nextBtn.onclick=()=>nextSong()
prevBtn.onclick=()=>{
    index=(index-1+queue.length)%queue.length
    loadSong()
}

shuffleBtn.onclick=()=>{
    isShuffle=!isShuffle
    shuffleBtn.style.opacity=isShuffle?1:0.5
}

repeatBtn.onclick=()=>{
    repeatMode=(repeatMode+1)%3
    repeatBtn.textContent=repeatMode===0?"🔁":repeatMode===1?"🔂":"🔁∞"
}

// ------------------- NEXT SONG LOGIC -------------------
function nextSong(){
    if(isShuffle){
        index=Math.floor(Math.random()*queue.length)
    }else{
        index++
        if(index>=queue.length){
            if(repeatMode===2) index=0
            else return
        }
    }
    loadSong()
}

audio.onended=()=>{
    if(repeatMode===1){
        loadSong()
    }else{
        nextSong()
    }
}

// ------------------- VOLUME & MUTE -------------------
volume.oninput=()=>{
    audio.volume=volume.value
    muteBtn.textContent=audio.volume==0?"🔇":"🔊"
}

muteBtn.onclick=()=>{
    audio.muted=!audio.muted
    muteBtn.textContent=audio.muted?"🔇":"🔊"
}

// ------------------- ADD TO PLAYLIST -------------------
function addToPlaylist(song){
    const name=prompt("Add to which playlist?")
    if(playlists[name]){
        playlists[name].push(song)
        savePlaylists()
        alert("Added to "+name)
    }
}
