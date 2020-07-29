function Music(id,imglink,sozyazari,besteci,name, singer, category){
    this.id=id;
    this.imglink = imglink;
    this.sozyazari = sozyazari;
    this.besteci = besteci;
    this.name = name;
    this.singer = singer;
    this.category = category;
};
const ids=[];
let Allmusics=[""];
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                const musics = rawFile.responseText.split("\n");
                musics.forEach(function(e){
                    const music = e.split(",");
                    const willbeadded = new Music(music[0],music[1],music[2],music[3],music[4],music[5],music[6]);
                    const link = willbeadded.imglink;
                    ids.push(willbeadded.id);
                    Allmusics.push(willbeadded);
                    
                });
                const card = document.querySelector(".card");
    
                card.innerHTML = add;
            }
        }
    }
    rawFile.send(null);
}

var add=" ";
readTextFile("../static/Allmusics.txt");





function addElements(arr,callback){  

    const card = document.querySelector(".card");
    for(var e = 1;e<Allmusics.length;e++){
        if(Allmusics[e].category.trim()==="Soft"){
        add = add +`<div class='card-item' >                  
                            <img src=${Allmusics[e].imglink}class='card-content'>
                            <div class='card-info'>
                                <h1 class='music-name'>${Allmusics[e].name}</h1>
                                <h3 class='music-singer'>${Allmusics[e].singer}</h3>
                                <h5 class='music-category'>${Allmusics[e].category}</h5>
                                <button class ="btn" id='${Allmusics[e].id}'>Play</button>
                            
                            </div>
                    </div>`;}
    }
    card.innerHTML = add;
    callback();
}
 
addElements(Allmusics,getElement);

let returnedSong =null;
var isPlaying = false;
var SongCurrent = new Audio();
var SongDesired =null;
const player = document.querySelector("#music");
function getElement(){
    var idSelected;
    Allcards = document.querySelectorAll(".card-item");
    
    //document.addEventListener("click", playMusic,false);
    Allcards.forEach(function(e){
        var bttn = e.getElementsByTagName("*");
        bttn[bttn.length-1].addEventListener("click", playMusic,false);
    });
    function playMusic(element){
        SongCurrent.pause();
        idSelected  = element.target.id;
        currentMusicId = 0;
        SongDesired = new Audio();
        SongDesired.src =`/static/songs/song_${idSelected}.mp3`;
        
        if(currentMusicId!== idSelected && isPlaying ===false ){
            player.style.opacity = 1;
            player.style.zIndex = 99;
            SongDesired.play();
            isPlaying =true;
            currentMusicId = idSelected;
            SongCurrent = SongDesired;
            
        }
        if(isPlaying ===true && currentMusicId!== idSelected && SongDesired!==null){
            player.style.zIndex = 99;
            player.style.opacity = 1;
            SongCurrent.pause();
            SongDesired.play();
            isPlaying =true;
            currentMusicId = idSelected;
            SongCurrent = SongDesired;
            SongCurrent.paused = false;
            SongDesired = null;
        }
        
        const imgPlayer = document.querySelector("#img-player");
        var linkOfPlayer = Allmusics[currentMusicId].imglink;
        imgPlayer.src = linkOfPlayer.slice(2,linkOfPlayer.length-1);
        const singSongName = document.querySelector("#sing-song-name");
        singSongName.textContent =`${Allmusics[currentMusicId].singer} - ${Allmusics[currentMusicId].name}`
        const sozMuzik = document.querySelector("#soz-muzik");
        console.log(sozMuzik);
        if(Allmusics[currentMusicId].sozyazari.trim()!==Allmusics[currentMusicId].besteci.trim())
            sozMuzik.textContent =`Söz:${Allmusics[currentMusicId].sozyazari.trim()} / Müzik- ${Allmusics[currentMusicId].besteci.trim()}`;
        else{
            sozMuzik.textContent =`Söz-Müzik:${Allmusics[currentMusicId].besteci}`;
        }
        const close = document.querySelector("#close");
        const minus = document.querySelector("#minus");
        close.addEventListener("click",stopMusic,false);
        
        minus.addEventListener("click",makeTransparent,false);
        function stopMusic(){
            SongCurrent.pause();
            player.style.opacity = 0;
            player.style.zIndex = -1;
        };
        function makeTransparent(){
            player.style.opacity = 0;
            player.style.zIndex = -1;
        };
        returnedSong = SongCurrent;

        const input = document.querySelector(".level");
        
        const currentMinute =document.querySelector("#currentMinute");
        const totalMinute = document.querySelector("#totalMinute");
        input.addEventListener("input",function(){
            SongCurrent.currentTime = input.value;

        });
        SongCurrent.addEventListener("loadeddata", function() {
            var minute = this.duration / 60;
            var second = this.duration%60;
            input.max = this.duration;
            
            if(second<10 && minute<10){totalMinute.textContent = `0${parseInt(minute)}:0${parseInt(second)}`;}
            if(second>=10 &&minute<10){totalMinute.textContent = `0${parseInt(minute)}:${parseInt(second)}`;}
            if(second<10 && minute>=10){totalMinute.textContent = `${parseInt(minute)}:0${parseInt(second)}`;}
            if(second<10 && minute>=10){totalMinute.textContent = `${parseInt(minute)}:0${parseInt(second)}`;}
             
            
           });
        SongCurrent.addEventListener("timeupdate",function(){
            var minute = parseInt(this.currentTime / 60);
            var second = parseInt(this.currentTime%60);
            
            input.value = (this.currentTime/this.duration)*input.max;
            ctr=0
            if(ctr===0){
                
                if(second<10 && minute<10){currentMinute.textContent = `0${parseInt(minute)}:0${parseInt(second)}`;}
                if(second>=10 &&minute<10){currentMinute.textContent = `0${parseInt(minute)}:${parseInt(second)}`;}
                if(second<10 && minute>=10){currentMinute.textContent = `${parseInt(minute)}:0${parseInt(second)}`;}
                if(second<10 && minute>=10){currentMinute.textContent = `${parseInt(minute)}:0${parseInt(second)}`;}
            }
            if(this.currentTime === this.duration){
                currentMinute.textContent = "00:00";
                input.value = 0;
                const playBt = document.querySelector(".fa-pause");
                if(playBt !== null){
                    playBt.className = "fa fa-play fa-lg";
                }

            }
        });  
       
    }
    
}
const stop =document.querySelector(".stop");
const backward = document.querySelector(".backward");
const forward = document.querySelector(".forward");

function pauseOrResume(){
   if(SongCurrent.paused===true){
    const pauseBt = document.querySelector(".fa-play");
    if(pauseBt !== null){
        pauseBt.className = "fa fa-pause fa-lg";
    }
    SongCurrent.play();
   
   }
  else{
    const playBt = document.querySelector(".fa-pause");
    if(playBt !== null){
        playBt.className = "fa fa-play fa-lg";
    }
    SongCurrent.pause();
    
   }
}
function goBackward(){
   if(SongCurrent.currentTime<10){
    SongCurrent.currentTime =0;
   }
   else{
    SongCurrent.currentTime = SongCurrent.currentTime-10;
   }
}
function goForward(){
    if(SongCurrent.currentTime>SongCurrent.duration-10){
        SongCurrent.currentTime = SongCurrent.duration;
       }
    else{
        SongCurrent.currentTime = SongCurrent.currentTime+10;
   }
}
stop.addEventListener("click",pauseOrResume,false); 
backward.addEventListener("click",goBackward,false); 
forward.addEventListener("click",goForward,false); 

function myFunction() {
    var x = document.getElementById("mynav-bar");
    var y = document.getElementsByTagName("header")[0];
    if (x.className === "nav-bar") {
      x.className += " responsive";
      y.style.display = "block";
      y.style.background = "purple";
    } else {
      x.className = "nav-bar";
      y.style.display = "flex";
      y.style.backgroundImage ='url("/static/img/navbar_image2.jpg")';
    }
  }







  