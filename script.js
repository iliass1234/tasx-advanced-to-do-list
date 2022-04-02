const audio = new Audio('./death.mp3');
const textArea = document.querySelector('#task-generator > input');
const leftSide = document.querySelector('aside');
const inputRange = document.querySelector('#pomodoro-config > input');
const pomodoroScreen = document.querySelector('#pomodoro-config > h1');

var timeoutsId;

let textOnFocus = false;


function createAtask(text){
    let node = document.createElement('div');
    let checkBtn = document.createElement('button');
    let h2 = document.createElement('h2');
    node.className = 'one-task';
    checkBtn.textContent = 'v';
    checkBtn.style = 'color: white; font-weight: 900;padding: 0;border-radius: 3px;height: 20px; width: 20px; background-color: green;margin-right: 20px;border:none;'
    h2.innerText = text;
    h2.style = 'font-weight: 300;font-family: tahoma, sans-serif;font-size: 17px; color: black;'
    node.style = 'opacity: 0;transition: 0.5s;background-color: lightgreen;border-bottom: 0px solid black;padding-left: 10px; align-items: center;justify-content: space-between; margin-top: 3px;; display: flex;font-size: 10px; color: white; height: auto;width: 100%;'
    setTimeout(() => {
        node.style.opacity = 1;
    }, 100);
    node.onmouseover = function(){
        this.style.backgroundColor = "rgb(200,255,200)";
        this.style.cursor = "pointer";
    }
    node.onmouseleave = function(){
        this.style.backgroundColor = "lightgreen";
        this.style.cursor = "pointer";
    }
    node.onclick = ()=>{
        const playground = document.querySelector('#bottom-section');
        playground.append(node);
    }
    checkBtn.onclick = function(){
        try {
            leftSide.removeChild(node);
        } catch (error) {
            console.log('I see')
        }
    }
    node.append(h2, checkBtn);
    return node;
}
textArea.onfocus = function(){
    textOnFocus = true;
};
textArea.onblur = function(){
    textOnFocus = false;
}
textArea.onkeydown = function(e){
    if (e.keyCode == 13) {
        if (!leftSide.firstChild) {
            console.log(leftSide.firstChild);
        }
        console.log(textArea.value)
        leftSide.insertBefore(createAtask(textArea.value), leftSide.firstChild)
        textArea.value = '';
    }
}
function createrButton(){
    if (textArea.value.length > 0) {
        let text = textArea.value;
        leftSide.insertBefore(createAtask(text), leftSide.firstChild)
        textArea.value = '';
    }
}

function deleteAll(){
    const arr = document.querySelectorAll('#left-side > .one-task');
    for (const task of arr) {
        leftSide.removeChild(task);
    }
}
function pomodoroClock(timeInMinutes){
    const indicator = document.querySelector('#clock-indicator');
    // the following line to reset everything;
    indicator.style.transform = `translate(-50%, -50%) rotate(${0}deg)`

    while(timeoutsId){
        window.clearTimeout(timeoutsId)
        timeoutsId--
    }

    let unitOfTime = 360/60;
    unitOfTime /= timeInMinutes;
    
    for (let i = 1; i <= 360/unitOfTime; i++) {
        timeoutsId = setTimeout(function(){
            console.log(i);
            if (i === 360/unitOfTime) {
                audio.play()
                console.log('i reached : ', audio)
                indicator.style.backgroundColor = 'red';
            }
            indicator.style.transform = `translate(-50%, -50%) rotate(${i*unitOfTime}deg)`;
        },1000*i);
        console.log(timeoutsId)
    } 
}
function startBtnClick(){
    pomodoroClock(Number(inputRange.value));
}

function changePomodoroScreen(){
    console.log('hello');
    pomodoroScreen.innerText = `${inputRange.value}:min`;
}



inputRange.oninput = changePomodoroScreen;