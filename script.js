const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

// passing joke to VoiceRss API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'b3d9649e90c84b6c91b079650d8566e5',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        //Catch errors here
        console.log('whooops', error);
    }
}

//  Event Listeners 
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);