let textArea = document.querySelector('#task-generator > input');
let leftSide = document.querySelector('aside');

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
    node.style = 'background-color: yellow;border-bottom: 1px solid black;padding-left: 10px; align-items: center;justify-content: space-between; margin-top: 3px;; display: flex;font-size: 10px; color: white; height: 40px;width: 100%;'

    checkBtn.onclick = function(){
        leftSide.removeChild(node);
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
    const arr = document.querySelectorAll('.one-task');
    for (const task of arr) {
        leftSide.removeChild(task);
    }
}