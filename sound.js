var bgsound=new Audio("./audio/Jungle Tribal Music Adventure Cinematic Royalty Free Music For Videogames and Videos [TubeRipper.com].mp3"
)
bgsound.loop=true
bgsound.currentTime=0 
bgsound.play()

function toggleSound() {
    const soundButton = document.getElementById("sound-button");
    
    if (bgsound.paused) {
        bgsound.play();
        soundButton.style.backgroundImage = "url('./assets/sound_on_-removebg-preview\ \(1\).png')";
    } else {
        bgsound.pause();
        soundButton.style.backgroundImage = "url(./assets/sound_off-removebg-preview.png)"; // Image for sound-off state
    }
}