const audio=document.getElementById("audio")
const playBtn=document.getElementById("play")
const nextBtn=document.getElementById("next")
const prevBtn=document.getElementById("prev")
const seek=document.getElementById("seek")
const title=document.getElementById("title")
const artist=document.getElementById("artist")
const cover=document.getElementById("cover")
const songList=document.getElementById("songList")

let queue=[...songs]
let index=0

queue.forEach((s,i)=>{
const li=document.createElement("li")
li.textContent=s.title+" - "+s.artist
li.onclick=()=>{
index=i
loadSong()
}
songList.appendChild(li)
})

function loadSong(){
const s=queue[index]
audio.src=s.src
title.textContent=s.title
artist.textContent=s.artist
cover.src=s.cover
audio.play()
playBtn.textContent="❚❚"
}

playBtn.onclick=()=>{
if(audio.paused){
audio.play()
playBtn.textContent="❚❚"
}else{
audio.pause()
playBtn.textContent="▶"
}
}

nextBtn.onclick=()=>{
index=(index+1)%queue.length
loadSong()
}

prevBtn.onclick=()=>{
index=(index-1+queue.length)%queue.length
loadSong()
}

audio.ontimeupdate=()=>{
seek.value=(audio.currentTime/audio.duration||0)*100
}

seek.oninput=()=>{
audio.currentTime=(seek.value/100)*audio.duration
}
