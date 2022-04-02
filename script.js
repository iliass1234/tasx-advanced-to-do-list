const playground = document.querySelector('#bottom-section');
const audio = new Audio('./death.mp3');
const textArea = document.querySelector('#task-generator > input');
const leftSide = document.querySelector('aside');
const inputRange = document.querySelector('#pomodoro-config > input');
const pomodoroScreen = document.querySelector('#pomodoro-config > h2');
let isClockRunning = false;

var timeoutsId;

let textOnFocus = false;


function createAtask(text){
    let node = document.createElement('div');
    let checkBtn = document.createElement('button');
    let h2 = document.createElement('h2');
    node.className = 'one-task';
    checkBtn.style = 'font-size: 5px;color: black; padding: 0; border-radius: 50%; height: 30px; width: 30px;border:none;margin-right: 30px;'
    deleteIcon = document.createElement('span');

    deleteIcon.className = 'material-icons';
    deleteIcon.innerText = 'delete';
    checkBtn.appendChild(deleteIcon);
    h2.innerText = text;
    h2.style = 'font-weight: 300;font-family: tahoma, sans-serif;font-size: 17px; color: black;'
    node.style = 'opacity: 0;transition: 0.5s;background: linear-gradient(90deg,rgb(114, 191, 165),white);border-bottom: 1px solid black;padding-left: 10px; align-items: center;justify-content: space-between; margin-top: 3px;; display: flex;font-size: 10px; color: white; height: auto;width: 100%;'
    setTimeout(() => {
        node.style.opacity = 1;
    }, 100);
    node.onmouseover = function(){
        this.style.background = 'linear-gradient(90deg,rgb(114, 191, 165),white)';
        this.style.cursor = "pointer";
    }
    node.onmouseleave = function(){
        this.style.background = 'linear-gradient(90deg,rgb(120, 200, 175),white)';
        this.style.cursor = "pointer";
    }
    node.onclick = ()=>{
        playground.append(node);
    }
    checkBtn.onclick = function(e){
        e.stopPropagation();
        try {
            leftSide.removeChild(node);
        } catch (error) {
        }
        try {
            playground.removeChild(node);
        } catch (error) {
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
function resetClock(){
    document.querySelector('#clock-indicator').style.transform = `translate(-50%, -50%) rotate(${0}deg)`
    
    while(timeoutsId){
        window.clearTimeout(timeoutsId)
        timeoutsId--
    }

}

function pomodoroClock(timeInMinutes){
    const indicator = document.querySelector('#clock-indicator');
    // the following line to reset everything;
    resetClock();



    let unitOfTime = 360/60;
    unitOfTime /= timeInMinutes;
    
    for (let i = 1; i <= 360/unitOfTime; i++) {
        timeoutsId = setTimeout(function(){
            if (i === 360/unitOfTime) {
                audio.play();
                indicator.style.background = 'linear-gradient(red, black, black)';
                setTimeout(()=>{
                    indicator.style.background = 'linear-gradient(rgb(51, 255, 0), black, black)';
                },3000);
            }
            indicator.style.transform = `translate(-50%, -50%) rotate(${i*unitOfTime}deg)`;
        },1000*i);
    } 
}
function startBtnClick(node){
    if (!isClockRunning) {
        pomodoroClock(Number(inputRange.value));
        node.innerText = 'Reset';
        isClockRunning = true;
    }else{
        resetClock();
        isClockRunning = false;
        node.innerText = 'Start';
    }
}

function changePomodoroScreen(){
    pomodoroScreen.innerText = `${inputRange.value}:min`;
}



inputRange.oninput = changePomodoroScreen;