let textArea = document.querySelector('#task-generator > input');
let leftSide = document.querySelector('aside');

let textOnFocus = false;

function createAtask(text){
    let node = document.createElement('div');
    let checkBtn = document.createElement('button');
    node.style = 'font-size: 20px; color: red; height: 40px;'
}

textArea.onfocus = function(){
    textOnFocus = true;
};
textArea.onblur = function(){
    textOnFocus = false;
}
textArea.onkeydown = function(e){
    if (e.keyCode == 13) {
        textArea.value = '';
        
        leftSide.insertBefore(newTask, leftSide.firstChild)
    }
}
