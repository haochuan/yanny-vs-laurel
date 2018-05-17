// Brought you by
// _haochuan<haochuan.liu@gmai.com>
// at May 16, 2018
//
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const slider = document.getElementById('freqSlider');
const label = document.getElementById('freqLabel');

const audioTag = document.getElementById('audioTag');
// create audio source in web audio api
const sourceNode = audioContext.createMediaElementSource(audioTag);
const gainNode = audioContext.createGain();
gainNode.gain.value = 10;

const filterNode = audioContext.createBiquadFilter();

filterNode.type = 'bandpass'; // bandpass filter
// filterNode.frequency.value = 1000;
filterNode.gain.value = 100;
filterNode.Q.value = 20;

// connect nodes
sourceNode.connect(filterNode);
filterNode.connect(gainNode);
gainNode.connect(audioContext.destination);

// setup slider for freq
slider.addEventListener(
  'input',
  e => {
    filterNode.frequency.value = e.target.value;
    label.innerHTML = `Frequency: ${e.target.value} Hz`;
  },
  false
);
