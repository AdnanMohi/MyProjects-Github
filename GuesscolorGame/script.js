const colorCodeContainer = document.getElementById("color-code")

let randomColor = null
let optionscontainer = document.getElementById('options-container')
let score=0;
const scoreContainer = document.getElementById('score')
const resstartButton = document.getElementById('restart-button')

const bgMusic = document.getElementById('bgMusic');
  const musicIcon = document.getElementById('musicIcon');
  const correctSound = document.getElementById('correctSound');

  musicIcon.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicIcon.classList.remove('fa-play');
      musicIcon.classList.add('fa-pause');
    } else {
      bgMusic.pause();
      musicIcon.classList.remove('fa-pause');
      musicIcon.classList.add('fa-play');
    }
  });
function playCorrectSound() {
    // Play the audio
    correctSound.play();
}

  


function generateRandomNumberBetween(min,max) {
    return min + Math.floor(Math.random() * (max - min +1))
}

function validateReusult(el){
    const selectedColor = el.target.style.backgroundColor;
console.log(el.target)
console.log(selectedColor === randomColor);
if(selectedColor === randomColor){
    document.getElementById('correctSound').play();
    incrementScore();
    
}else{

    score -=1;
    scoreContainer.innerText = score.toString();
  
}
    window.localStorage.setItem('score', score);
    startGame();
}
resstartButton.addEventListener('click', restartGame);

function restartGame(){
    score = 0;
    window.localStorage.setItem('score', score);
    startGame();
}


function incrementScore(){
    score += 1;
    //document.getElementById('score')
    scoreContainer.innerText = score;
}






function generateRandomColorRGB(){
const red = generateRandomNumberBetween(0, 255);
const green = generateRandomNumberBetween(0, 255);
const blue = generateRandomNumberBetween(0, 255);
return `rgb(${red}, ${green}, ${blue})`;
}



//console.log(generateRandomColorRGB(0,255));

function startGame(){
    score = Number(window.localStorage.getItem('score')) ?? 0 ;
    scoreContainer.innerText = score;
    optionscontainer.innerHTML = null;
randomColor = generateRandomColorRGB();
colorCodeContainer.innerText =  `Guess The Color =  ${randomColor}`;

const ansIndex = generateRandomNumberBetween(0, 5)

for (let i = 0; i < 6; i++) {
    const div = document.createElement('div');
    div.addEventListener("click", validateReusult);

    div.style.backgroundColor = i === ansIndex ? randomColor :
     generateRandomColorRGB()  ;
    optionscontainer.append(div);
}
}

window.addEventListener('load', () => startGame());