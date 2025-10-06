console.log("hello")



async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/spotify%20clone/spotify-songs/")
    let response = await a.text()
    //console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/spotify-songs/")[1]);
            //(decodeURIComponent(element.split("/spotify-songs/")[1]));
            //(element.href.split("/spotify-songs/")[1])
        }
    }
    return songs
}

const playMusic = (track) =>{
    let audio = new Audio("/songs/" + track)
    audio.play()
}

async function main() {

    let currentSong;

    let songs = await getSongs()

    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]

    songs.forEach(songs => {
        songUl.innerHTML = songUl.innerHTML + `<li><img src="music.svg" class="invert" alt="">
                            <div class="info">
                                <div>${songs.replaceAll("%20", " ").replaceAll("Sony Animation", " ").replaceAll("Official", " ").replaceAll("KPop Demon Hunters", " ")}</div>
                                <div>Song Artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                            </li>`;



    }

    );

    //Attach an event listener to each song
   // Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
     //   e.addEventListener("click", element=>{
       // console.log(e.querySelector(".info").firstElementChild.innerHTML)
        //playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        //})
    //})

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
        let playing = e.getAttribute("songs");
        playMusic(playing);
    });
});





    //for(const song of songs){
    // songUl.innerHTML = songUl.innerHTML + `<li> ${songs.replace("20%" ," ")} </li>`;
    //}

    //var audio = new Audio(songs[0]);
    //audio.play();

    //audio.addEventListener("loadeddata", () => {
      //  console.log(audio.duration, audio.currentSrc, audio.currentTime)
    //});
}

main()
