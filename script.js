const playground = document.querySelector('#bottom-section');
const audio = new Audio('./alarm.mp3');
const textArea = document.querySelector('#task-generator > input');
const leftSide = document.querySelector('aside');
const inputRange = document.querySelector('#pomodoro-config > input');
const pomodoroScreen = document.querySelector('#pomodoro-config > h2');
const importantBtn = document.querySelector('#important-btn');


let isImportantTask = false;
let isClockRunning = false;

var timeoutsId;
var undoTimeouts;
let textOnFocus = false;

function startLocalStorage(){
    if(!localStorage.getItem('lastTaskId')){
        localStorage.setItem('lastTaskId','0');
    }
}
startLocalStorage();

function drawTasks(){
    const lastTaskId = Number(localStorage.getItem('lastTaskId'));

    for (let i = lastTaskId; i >= 0; i--) {
        let task = localStorage.getItem('task-'+i);
        task = JSON.parse(task);
        if (!task) {
            console.log('not found');
            continue;
        }
        const firstChild = leftSide.firstChild;
        leftSide.appendChild(createAtask(task));
        
    }
}

drawTasks();

function returnValidTaskId(){
    let lastId = Number(localStorage.getItem('lastTaskId'));
    console.log('valid id :'+lastId);
    return 'task-'+lastId++;
}

function increaseLastTaskId(){
    let lastId = localStorage.getItem('lastTaskId');
    lastId = Number(lastId)+1;
    localStorage.setItem('lastTaskId', `${lastId}`);
}

function returnTaskObj(text, color){
    color = color || 'white';
    const taskObj = {};
    taskObj.id = returnValidTaskId();
    taskObj.importance = isImportantTask;
    taskObj.text = text;
    taskObj.color = color;
    taskObj.inProgress = false;

    localStorage.setItem(taskObj.id, `${JSON.stringify(taskObj)}`);
    increaseLastTaskId();

    return taskObj;

}

function createAtask(taskObject){
    const text = textArea.value;

    let node = document.createElement('div');
    let checkBtn = document.createElement('button');
    let h2 = document.createElement('h2');
    node.className = 'one-task';
    checkBtn.className = 'check-btn';
    deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-icons';
    deleteIcon.innerText = 'delete';
    node.dataset.inProgress = taskObject.inProgress;
    checkBtn.appendChild(deleteIcon);

    h2.innerText = taskObject.text;

    if (taskObject.importance) {
        node.dataset.important = true;
        node.style.background = 'linear-gradient(90deg,gold,white)';
    }
    setTimeout(() => {
        node.style.opacity = 1;
    }, 100);
    node.onmouseover = function(){
        this.style.cursor = "pointer";
        if (node.dataset.important) return;
        this.style.background = 'linear-gradient(90deg,rgb(114, 191, 165),white)';
    }
    node.onmouseleave = function(){
        this.style.cursor = "pointer";
        if (node.dataset.important) return;
        this.style.background = 'linear-gradient(90deg,rgb(165, 255, 205),white)';
    }
    node.onclick = ()=>{
        const p = document.querySelector('#bottom-section > p');
        if (!this.inProgress) {  
            this.inProgress = true; 
            p.style.display = 'none';
            playground.append(node);
        }else{
            leftSide.append(node);
            this.inProgress = false;
        }
    }
    checkBtn.onclick = function(e){
        e.stopPropagation();
        localStorage.removeItem(taskObject.id);
        console.log(playground.childElementCount);
        try {
            leftSide.removeChild(node);
        } catch (error) {
            playground.removeChild(node);
            if (playground.childElementCount <= 2) {
                console.log('hna');
                const p = document.querySelector('#bottom-section > p');
                p.style.display = 'block';
            }
        }
    }
    node.append(h2, checkBtn);

    importantBtn.style.color = 'rgb(71, 121, 104)';
    isImportantTask = false;
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
        leftSide.insertBefore(createAtask(returnTaskObj(textArea.value)), leftSide.firstChild)
        textArea.value = '';
    }
}
function createrButton(){
    if (textArea.value.length > 0) {
        leftSide.insertBefore(createAtask(returnTaskObj(textArea.value)), leftSide.firstChild)
        textArea.value = '';
    }
}

function deleteAll(){
    const arr = document.querySelectorAll('#left-side > .one-task');
    localStorage.clear();
    for (const task of arr) {
        leftSide.removeChild(task);
    }
}
function resetClock(){
    const startBtn = document.querySelector('#start-btn');
    document.querySelector('#clock-indicator').style.transform = `translate(-50%, -50%) rotate(${0}deg)`
    startBtn.innerText = "Start";
    startBtn.style.backgroundColor = 'rgb(75, 126, 109)';
    isClockRunning = false;
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
                isClockRunning = false;
                resetClock();
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
        node.style.backgroundColor = 'red';
        isClockRunning = true;
    }else{
        resetClock();
    }
}
function changePomodoroScreen(){
    pomodoroScreen.innerText = `${inputRange.value}:min`;
}
importantBtn.onclick = function(){
    if (!isImportantTask) {
        this.style.color = 'gold';
        isImportantTask = true;
    }else{
        this.style.color = 'rgb(71, 121, 104)';
        isImportantTask = false;
    }
}
inputRange.oninput = changePomodoroScreen;

function undo(){
    const undoDiv = document.querySelector('#undo-messege');
    undoDiv.style.display = 'none';
}