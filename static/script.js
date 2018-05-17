// Brought you by
// _haochuan<haochuan.liu@gmai.com>
// at May 16, 2018
//
//

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const slider = document.getElementById('freqSlider');
const label = document.getElementById('freqLabel');

let isPlaying = false;
let audioBuffer = null; // store audio buffer
// create audio source in web audio api
// due to the support in iOS, cannot use createMediaElementSouce
// const audioTag = document.getElementById('audioTag');
// const sourceNode = audioContext.createMediaElementSource(audioTag);
const gainNode = audioContext.createGain();
gainNode.gain.value = 15;

const filterNode = audioContext.createBiquadFilter();
let sourceNode;

filterNode.type = 'bandpass'; // bandpass filter
// filterNode.frequency.value = 1000;
filterNode.gain.value = 100;
filterNode.Q.value = 5;

loadAudio('yanny-laurel.wav');

// connect nodes
gainNode.connect(filterNode);
filterNode.connect(audioContext.destination);

// setup slider for freq
slider.addEventListener(
  'input',
  e => {
    filterNode.frequency.value = e.target.value;
    label.innerHTML = `Frequency: ${e.target.value} Hz`;
  },
  false
);

// toggle button
const button = document.getElementById('toggleAudio');

button.addEventListener(
  'click',
  e => {
    if (isPlaying) {
      sourceNode.stop();
      isPlaying = false;
      button.innerHTML = 'Play';
    } else {
      sourceNode = audioContext.createBufferSource(); // creates a sound source
      sourceNode.buffer = audioBuffer;
      sourceNode.loop = true;
      sourceNode.connect(gainNode);
      sourceNode.start();
      isPlaying = true;
      button.innerHTML = 'Pause';
    }
  },
  false
);

function loadAudio(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    audioContext.decodeAudioData(
      request.response,
      function(buffer) {
        audioBuffer = buffer; // tell the source which sound to play
      },
      null
    );
  };
  request.send();
}
