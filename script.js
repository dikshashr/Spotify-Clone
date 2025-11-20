
console.log("hello")
let currentsong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/spotify-clone/spotify-songs/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/spotify-songs/")[1]);
        
        }
    }
    return songs
}

const playMusic = (track) => {
    // Full absolute URL to the MP3, matching your fetch path
    //let audio = new Audio("http://127.0.0.1:5500/spotify-clone/spotify-songs/" + track)
    currentsong.src = "http://127.0.0.1:5500/spotify-clone/spotify-songs/" + track
    currentsong.play()
}


async function main() {


    let songs = await getSongs()

    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]

    // Renamed loop variable from "songs" to "song" to avoid shadowing the array.
    // Added data-song attribute to store the original filename (for playing).
    // Display name is cleaned separately (replacements only affect what's shown, not the data).
    songs.forEach(song => {
        songUl.innerHTML = songUl.innerHTML + `<li data-song="${song}"><img src="music.svg" class="invert" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ").replaceAll("Sony Animation", " ").replaceAll("Official", " ").replaceAll("KPop Demon Hunters", " ")}</div>
                                <div>Song Artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                            </li>`;
    });

    // Updated event listener to read the song from the data-song attribute.
    // Now it correctly gets the filename and passes it to playMusic.
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            let playing = e.dataset.song;
            playMusic(playing);
        });
    });

    // Attach an event listner to play, next adn previous
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentsong.play()
            play.src = "pause.svg"
        }
        else{
            currentsong.pause()
            play.src = "play.svg"
        }
    })
}

main()
