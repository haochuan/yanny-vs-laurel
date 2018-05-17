# When "Yanny vs Laurel" Meets Web Audio API
If you haven't heard the "Yanny vs Laurel" story yet, here is an [article from New York Times](https://www.nytimes.com/2018/05/15/science/yanny-laurel.html) to help you get the background story.

There is no magic behind this. **Different ears have different sensitive frequency zones for the same audio clip.** Also different speakers have different response to different audio frequencies.

This tutorial will go through the details about how to use Web Audio API and simple Javascript to create a tool helping you hear both "Yanny" and "Laurel", if you really want to know :)

---

Let's talk about the key part first. In order to hear the different word, you need to somehow increase the volume for a specific frequency range which depends on your ears. Luckily the Web Audio API already got something ready for us: `BiquadFilterNode`.

There are different type of [`BiquadFilterNode`](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) you can use. For this case, we will just go with the `bandpass` filter.

> A bandpass filter is an electronic device or circuit that allows signals between two specific frequencies to pass, but that discriminates against signals at other frequencies. 
> https://whatis.techtarget.com/definition/bandpass-filter
> 

And for a bandpass filter, most of the time we just need to define the center frequency value we want to boost or cut, instead of the start and the end of the frequency range. We use a `Q` value to control the width of the frequency range. The large the `Q` is, the narrow the frequency range will be. For more detail, please see [wiki](https://en.wikipedia.org/wiki/Q_factor).

---

That's all the knowledge we need to know. Let's write the code now.

#### Web Audio API Initialization
```js
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
```

---

#### Create Audio Nodes and setup and signal chain
```js
// the audio tag in HTML, where holds the original audio clip
const audioTag = document.getElementById('audioTag');
// create audio source in web audio api
const sourceNode = 

audioContext.createMediaElementSource(audioTag);

const filterNode = audioContext.createBiquadFilter();

filterNode.type = 'bandpass'; // bandpass filter
filterNode.frequency.value = 1000 // set the center frequency
filterNode.gain.value = 100; // set the gain to the frequency range
filterNode.Q.value = 20; // set Q value, 20 will make a fair band width for this case

// connect nodes
sourceNode.connect(filterNode);
filterNode.connect(gainNode);
gainNode.connect(audioContext.destination);
```

---

#### Sample HTML file
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Yanny vs Laurel Web Audio API</title>
</head>
<body>
  <div id="container">
    <audio id='audioTag' crossorigin="anonymous" src="yanny-laurel.wav" controls loop></audio>
    <hr>
    <input type="range" min="20" max="10000" value="20" step="1" class="slider" id="freqSlider">
  </div>
  <script src='script.js'></script>
</body>
</html>
```

---

#### Adding frequency slider UI
To make it more easy to adjust the center frequency of our bandpass filter, it's good to add a slider to control the value.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Yanny vs Laurel Web Audio API</title>
</head>
<body>
  <div id="container">
    <audio id='audioTag' crossorigin="anonymous" src="yanny-laurel.wav" controls loop></audio>
    <hr>
    <input type="range" min="20" max="10000" value="20" step="1" class="slider" id="freqSlider">
    <br>
    <p id="freqLabel" >Frequency: 20</p>
  </div>
  <script>
    // add event listener for slider to change frequency value
    slider.addEventListener('input', e => {
      filterNode.frequency.value = e.target.value;
      label.innerHTML = `Frequency: ${e.target.value}Hz`;
    }, false);
  <script src='script.js'></script>
</body>
</html>
```

---

Now you made yourself a tool to hear both 'Yanny' and 'Laurel". Just open your browser, play the audio, and try to find the sweet spot while moving the frequency slider.

If you want to just try the tool, it is live [HERE](https://haochuan.github.io/yanny-vs-laurel/static/).



