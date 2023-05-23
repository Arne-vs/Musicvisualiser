const gridElem = document.querySelector('#grid');
const gridElemBg = document.querySelector('#grid-bg');
const gridElemContent = document.querySelector('#grid-content');
const gridFontSize = parseInt(getComputedStyle(gridElem).fontSize, 10);
const img = document.querySelector('#image');
//const gridFontSize = parseInt(30, 10);
//console.log(getComputedStyle(gridElem).fontSize);




let colCount = 0;
let rowCount = 0;
let pixelCount = 0;
let pixels = [];

const charRangeStart = 33;
const charRangeEnd = 56;
const charRangeMax = charRangeEnd - charRangeStart;

function updateSize() {
  gridElemContent.innerHTML = "";
  gridElemBg.style.backgroundSize = "";
  gridElemBg.style.backgroundImage = "";
  
  colCount = Math.floor(gridElem.clientWidth / gridFontSize);
  rowCount = Math.floor(gridElem.clientHeight / gridFontSize);
  pixelCount = colCount * rowCount;
  
  pixels = Array(pixelCount).fill(String.fromCharCode(charRangeStart));
  
  let bgSize = [];
  for(let row = 0; row < rowCount; row++) {
      bgSize.push(`${colCount * gridFontSize}px ${row * gridFontSize}px`);
  }
  gridElemBg.style.backgroundSize = bgSize.join(',');
  
  render();
}



function generate(ticks) {
    let cx = Math.floor(colCount / 2);
    let cy = Math.floor(rowCount / 2);

    for(let i = 0; i < pixelCount; i++) {
        let x = i % colCount;
        let y = Math.floor(i / colCount);
        
        let t = 100 + (ticks * 0.001);
        let v = ((Math.cos((x - cx) / 8.0) + Math.sin((y - cy) / 8.0) + t) * 16);
        
        let charVal = v % charRangeMax;
        
        pixels[i] = String.fromCharCode(charRangeStart + (charVal % charRangeMax));
    }
}

function generateColors() {
    let bgImage = [];
    let bgImageParts = [];
    let percent = 0;
    
    const percentInterval = 100 / colCount;

    for(let i = 0; i < pixelCount; i++) {
        let pixel = pixels[i];

        let hslAngle = ((pixel.charCodeAt(0) - charRangeStart) / charRangeMax) * 360;
        let pixelColor = `hsl(${hslAngle}, 70%, 50%)`;

        let bgImagePart = `${pixelColor} ${percent}%`;
        percent += percentInterval;
        bgImagePart += `, ${pixelColor} ${percent}%`;
        
        bgImageParts.push(bgImagePart);
        
        if((i + 1) % colCount === 0) {
            bgImage.push(`linear-gradient(to right, ${bgImageParts.join(', ')})`);
            
            percent = 0;
            bgImageParts = [];
        }
    }
    
    gridElemBg.style.backgroundImage = bgImage.join(',');
}

function render(ticks = 0) {
  generate(ticks);
  generateColors();
  
  let content = '';

  //content += colCount + " x " + rowCount + " = " + pixelCount + "\n";
  
  content = pixels.reduce( (prev, curr, idx) => {        
      return prev + curr + ((idx + 1) % colCount === 0 ? '\n' : '');
  });
  
  gridElemContent.innerHTML = content;
  
  animationId = requestAnimationFrame(render);
}

//tot hier eerste visual

window.addEventListener('resize', updateSize);

const background = document.querySelector(".background");
let width = window.innerWidth;
let height = window.innerHeight;

// Default values
let shapeWidth = 50;
let shapeHeight = 80;
let padding = 10;
let maxInterval = 0.1;
let minInterval = 0.1;

// Init background
placeElements();

function placeElements() {
  for (let i = 0; i < width / (shapeWidth + padding); i++) {
    for (let j = 0; j < height / (1 * (shapeHeight + padding)); j++) {
      let x = i * (shapeWidth + padding);
      let y = j * (2 * (shapeHeight + padding));
      if (i % 2 === 1) {
        y += (shapeHeight + padding);
      }
      let hexagon = document.createElement("div");
      hexagon.classList.add("hexagon");
      hexagon.style.left = x + "px";
      hexagon.style.top = y + "px";
      background.appendChild(hexagon);
    }
  }
}

window.addEventListener("resize", () => {
  background.innerHTML = '';
  width = window.innerWidth;
  height = window.innerHeight;

  placeElements();
});

function pulse() {
  let hexagons = Array.from(background.children);
  let randomIndex = Math.floor(Math.random() * hexagons.length);
  let randomHexagon = hexagons[randomIndex];
  randomHexagon.classList.remove("pulse");

  setInterval(function(){
    randomHexagon.classList.add("pulse");
  }, 10);
}

setInterval(pulse, Math.floor(Math.random() * maxInterval + minInterval));


// Play with these!
const PX = 600;
const N = 20;
const SPEED = 6;
const RANGE = [40, 400];

let a, b, c, d;
setCoefficients();
const fn = (x, y) => [a * x + b * y, c * x + d * y];

// Derived.
const SPACING = PX / N;
const HALF_PX = PX / 2;
const HALF_N = Math.floor(N / 2) + 1;
if (RANGE[0] < SPEED) RANGE[0] = SPEED;

const container = document.querySelector('.container');
const canvas = document.createElement('canvas');
canvas.height = canvas.width = PX;
canvas.style.height = canvas.style.width = `1785px`;
container.appendChild(canvas);

const ctx = canvas.getContext('2d');
ctx.translate(HALF_PX, HALF_PX);
ctx.globalCompositeOperation = 'xor';

let dir = 5;
let lw = RANGE[0] + SPEED;
(function draw () {
	if (lw <= RANGE[0] || lw > RANGE[1]) dir = -dir;
	lw = ctx.lineWidth = lw + dir * SPEED;
	
	ctx.clearRect(-HALF_PX, -HALF_PX, PX, PX);
	for (let y = -HALF_N; y < HALF_N; ++y) {
		const yPx = y * SPACING;
		ctx.beginPath();
		for (let x = -HALF_N; x < HALF_N; ++x) {
			const xPx = x * SPACING;
			ctx.moveTo(xPx, yPx);
			ctx.lineTo(...fn(xPx, yPx));
		}
		ctx.stroke();
	}
	
	requestAnimationFrame(draw);
})();

function setCoefficients () {
	a = (Math.random() < 0.5) * 2 - 1;
	b = (Math.random() < 0.5) * 2 - 1;
	c = (Math.random() < 0.5) * 2 - 1;
	d = (Math.random() < 0.5) * 2 - 1;
}

let randomColor = "red";
ctx.strokeStyle = randomColor;
ctx.stroke();

container.addEventListener('click', setCoefficients, false);


const audioElementMusic = document.getElementById('audio');
let isPlayingMusic = false;
let showInfo = false;
const audioElementDrums = document.getElementById('audio2');
const audioElementFull = document.getElementById('audio3');
const audioElementCalmDown = document.getElementById('audio4');
let isPlayingDrums = false;
let isPlayingFull = false;
const art = document.getElementById('ascii-art');
const artR = document.getElementById('ascii-artReverse');
const artR2 = document.getElementById('ascii-artReverse2');
const art2 = document.getElementById('ascii-art2');
const titel = document.querySelector('#titel')

let animationId;

document.addEventListener('keydown', function(e) {
  if (e.keyCode == 77 || e.keyCode == 71 || e.keyCode == 78 || e.keyCode == 86 || e.keyCode == 72 || e.keyCode == 70 || e.keyCode == 82 || e.keyCode == 69 || e.keyCode == 65 || e.keyCode == 76) {
    if (isPlayingMusic) {
      audioElementMusic.pause();
      isPlayingMusic = false;
      art.style.visibility = 'hidden'; // hide the div
      
    } else {
      audioElementMusic.play();
      isPlayingMusic = true;
      art.style.visibility = 'visible'; // show the div
      titel.style.display = 'none';
    }
  } else if (e.keyCode == 68 || e.keyCode == 85 || e.keyCode == 79 || e.keyCode == 80 ||e.keyCode == 74 || e.keyCode == 83 || e.keyCode == 75 || e.keyCode == 90 || e.keyCode == 88 || e.keyCode == 66) {
    if (isPlayingDrums) {
      audioElementDrums.pause();
      isPlayingDrums = false;
      art2.style.visibility = 'hidden'; // hide the div
    } else {
      audioElementDrums.play();
      isPlayingDrums = true;
      art2.style.visibility = 'visible'; // show the div
      titel.style.display = 'none';
    }
  }
  else if (e.keyCode == 32) {
    if (isPlayingFull) {
      audioElementFull.pause();
      isPlayingFull = false;
      art.style.visibility = 'hidden'; // hide the div
      art2.style.visibility = 'hidden';
      gridElem.style.display = 'none';
      art.style.textShadow = "none";
    } else {
      audioElementFull.play();
      isPlayingFull = true;
      titel.style.display = 'none';
      art.style.visibility = 'visible'; 
      art2.style.visibility = 'visible';
      gridElem.style.display = 'grid';
      updateSize()
      art.style.textShadow = "30px 13px rgba(246, 0, 153,0.8),  -38px -4px rgba(15, 210, 255,0.8), -2px -4px rgba(255, 210, 0, 1)" // hide the div
    }
  }
  if (e.keyCode == 77 || e.keyCode == 65) {
    if (isPlayingMusic) {
      gridElem.style.display = 'grid';
      updateSize()
    } else {
      gridElem.style.display = 'none';

      
    }
  }

  if (e.keyCode == 71 || e.keyCode == 86) {
    if (isPlayingMusic) {
      art.style.textShadow = "30px 13px rgba(246, 0, 153,0.8),  -38px -4px rgba(15, 210, 255,0.8), -2px -4px rgba(255, 210, 0, 1)" // hide the div
      
    } else {
      art.style.textShadow = "none";
      
      
    }
  }
  if (e.keyCode == 82) {
    if (isPlayingMusic) {
      art.style.color = "red" // hide the div
      
    } else {
      art.style.color = "white";
    }
  }

  if (e.keyCode == 72 || e.keyCode == 76) {
    if (isPlayingMusic) {
      background.style.visibility = "visible" // hide the div
      
    } else {
      background.style.visibility = "hidden"
    }
  }

  if (e.keyCode == 69 || e.keyCode == 70 || e.keyCode == 78) {
    if (isPlayingMusic) {
      container.style.visibility = "visible" // hide the div
      
    } else {
      container.style.visibility = "hidden"
    }
  }

  if (e.keyCode == 85 || e.keyCode == 66) {
    if (isPlayingDrums) {
      container.style.visibility = "visible" // hide the div
      
    } else {
      container.style.visibility = "hidden"

    }
  }

  if (e.keyCode == 75 || e.keyCode == 90) {
    if (isPlayingDrums) {
      background.style.visibility = "visible" // hide the div
      
    } else {
      background.style.visibility = "hidden"
    }
  }

  if (e.keyCode == 79 || e.keyCode == 88) {
    if (isPlayingDrums) {
      art2.style.textShadow = "30px 13px rgba(246, 0, 153,0.8),  -38px -4px rgba(15, 210, 255,0.8), -2px -4px rgba(255, 210, 0, 1)" // hide the div
      
    } else {
      art2.style.textShadow = "none";
      
      
    }
  }
  if (e.keyCode == 74 || e.keyCode == 83) {
    if (isPlayingDrums) {
      gridElem.style.display = 'grid';
      updateSize()
    } else {
      gridElem.style.display = 'none';
      
    }
  }

  if (e.keyCode == 80) {
    if (isPlayingDrums) {
      art2.style.color = "red" // hide the div
      
    } else {
      art2.style.color = "white";
    }
  }


  if (e.keyCode == 84) {
    if (isPlayingMusic) {
      audioElementMusic.pause();
      isPlayingMusic = false;
      artR.style.visibility = 'hidden';
      
    } else {
      audioElementMusic.play();
      isPlayingMusic = true;
      artR.style.visibility = 'visible';
      titel.style.display = 'none';
    }
  }

  

  if (e.keyCode == 89) {
    if (isPlayingMusic) {
      audioElementMusic.pause();
      isPlayingMusic = false;
      artR.style.visibility = 'hidden';
      artR.style.background = 'linear-gradient(to right, red,  orange , yellow, green, cyan, blue, indigo, violet)';
      artR.style.webkitBackgroundClip = 'text';
      
    } else {
      audioElementMusic.play();
      isPlayingMusic = true;
      artR.style.visibility = 'visible';
      titel.style.display = 'none';
      artR.style.background = 'white';
      artR.style.webkitBackgroundClip = 'text';
    }
  }

  if (e.keyCode == 81) {
    if (isPlayingDrums) {
      audioElementDrums.pause();
      isPlayingDrums = false;
      artR2.style.visibility = 'hidden';
      
    } else {
      audioElementDrums.play();
      isPlayingDrums = true;
      artR2.style.visibility = 'visible';
      titel.style.display = 'none';
    }
  }
  if (e.keyCode == 87) {
    if (isPlayingDrums) {
      audioElementDrums.pause();
      isPlayingDrums = false;
      artR2.style.visibility = 'hidden';
      artR2.style.background = 'linear-gradient(to right, red,  orange , yellow, green, cyan, blue, indigo, violet)';
      artR2.style.webkitBackgroundClip = 'text';
    } else {
      audioElementDrums.play();
      isPlayingDrums = true;
      artR2.style.visibility = 'visible';
      titel.style.display = 'none';
      artR2.style.background = 'white';
      artR2.style.webkitBackgroundClip = 'text';
    }
  }
  if (e.keyCode == 73) {
    if (showInfo) {
      keyboard.style.visibility = "hidden"

      showInfo = false; // hide the div
      
    } else {
      keyboard.style.visibility = "visible"
      showInfo = true;
    }
  }
});

document.addEventListener('keydown', function(e) {
  if (e.keyCode == 67) { // Check if 'c' key is pressed
    // Show the image
    img.style.visibility = 'visible';
    keyboard.style.visibility = "hidden"
    audioElementDrums.pause();
    audioElementMusic.pause();
    audioElementFull.pause();
    audioElementCalmDown.play();
    isPlayingDrums = false;
    artR2.style.visibility = 'hidden';
    artR.style.visibility = 'hidden';
    art.style.visibility = 'hidden';
    art2.style.visibility = 'hidden';
    titel.style.display = 'none';
    gridElem.style.display = 'none';
    container.style.visibility = "hidden"
    background.style.visibility = "hidden"
  } else {
    // Hide the img
    img.style.visibility = 'hidden';
    audioElementCalmDown.pause();
    // Rest of your code for handling other keys
    if (e.keyCode == 77 || e.keyCode == 71 || e.keyCode == 78 || e.keyCode == 86 || e.keyCode == 72 || e.keyCode == 70 || e.keyCode == 82 || e.keyCode == 69 || e.keyCode == 65 || e.keyCode == 76) {
      // Handle music related logic
    } else if (e.keyCode == 68 || e.keyCode == 85 || e.keyCode == 79 || e.keyCode == 80 ||e.keyCode == 74 || e.keyCode == 83 || e.keyCode == 75 || e.keyCode == 90 || e.keyCode == 88 || e.keyCode == 66) {
      // Handle drums related logic
    }
    // Rest of your code for handling other keys
  }
});

function getKey (e) {
  let location = e.location;
  let selector;
  if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
      selector = ['[data-key="' + e.keyCode + '-R"]']
  } else {
      let code = e.keyCode || e.which;
      selector = [
          '[data-key="' + code + '"]',
          '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
      ].join(',');
  }
  return document.querySelector(selector);
}

function pressKey (char) {
  let key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
  if (!key) {
      return console.warn('No key for', char);
  }
}

let h1 = document.querySelector('h1');
let originalQueue = h1.innerHTML;
let queue = h1.innerHTML;

function next () {

  pressKey(c);

}

setTimeout(next, 500);

function pressKey(char) {
  let key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
  if (!key) {
    return console.warn('No key for', char);
  }
  let isPressed = key.getAttribute('data-pressed');
  if (isPressed === 'on') {
    key.removeAttribute('data-pressed');
  } else {
    key.setAttribute('data-pressed', 'on');
  }
}

document.body.addEventListener('keydown', function(e) {
  let key = getKey(e);
  if (!key) {
    return console.warn('No key for', e.keyCode);
  }

  pressKey(key.getAttribute('data-char'));
});

function size () {
  let size = keyboard.parentNode.clientWidth / 90;
  keyboard.style.fontSize = size + 'px';
  console.log(size);
}

const keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
  size();
});
size();