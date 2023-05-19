const gridElem = document.querySelector('#grid');
const gridElemBg = document.querySelector('#grid-bg');
const gridElemContent = document.querySelector('#grid-content');
const gridFontSize = parseInt(getComputedStyle(gridElem).fontSize, 10);



var colCount = 0;
var rowCount = 0;
var pixelCount = 0;
var pixels = [];

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





const audioElementMusic = document.getElementById('audio');
let isPlayingMusic = false;
const audioElementDrums = document.getElementById('audio2');
const audioElementFull = document.getElementById('audio3');
let isPlayingDrums = false;
let isPlayingFull = false;
const art = document.getElementById('ascii-art');
const artR = document.getElementById('ascii-artReverse');
const artR2 = document.getElementById('ascii-artReverse2');
const art2 = document.getElementById('ascii-art2');
const titel = document.querySelector('#titel')

let animationId;

document.addEventListener('keydown', function(e) {
  if (e.keyCode == 77 || e.keyCode == 71 || e.keyCode == 78 || e.keyCode == 66 || e.keyCode == 86 || e.keyCode == 72 || e.keyCode == 70 || e.keyCode == 82) {
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
  } else if (e.keyCode == 68) {
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
  if (e.keyCode == 77) {
    if (isPlayingMusic) {
      gridElem.style.display = 'grid';
      updateSize()
    } else {
      gridElem.style.display = 'none';
      
    }
  }

  if (e.keyCode == 71) {
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

  if (e.keyCode == 72) {
    if (isPlayingMusic) {
      background.style.visibility = "visible" // hide the div
      
    } else {
      background.style.visibility = "hidden"
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
});

