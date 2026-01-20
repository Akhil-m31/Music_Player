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

let queue=[...songs]
let index=0
let isShuffle=false
let repeatMode=0

songList.innerHTML=""
queue.forEach((s,i)=>{
const li=document.createElement("li")
li.innerHTML=`${s.title} - ${s.artist} <button data-id="${i}">＋</button>`
li.onclick=()=>{
index=i
loadSong()
}
li.querySelector("button").onclick=e=>{
e.stopPropagation()
addToPlaylist(s)
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

volume.oninput=()=>{
audio.volume=volume.value
muteBtn.textContent=audio.volume==0?"🔇":"🔊"
}

muteBtn.onclick=()=>{
audio.muted=!audio.muted
muteBtn.textContent=audio.muted?"🔇":"🔊"
}

function addToPlaylist(song){
const name=prompt("Add to which playlist?")
if(playlists[name]){
playlists[name].push(song)
savePlaylists()
alert("Added to "+name)
}
}
