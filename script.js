let textArea = document.querySelector('#task-generator > input');
let leftSide = document.querySelector('aside');

let textOnFocus = false;

function createAtask(text){
    let node = document.createElement('div');
    let checkBtn = document.createElement('button');
    let h2 = document.createElement('h2');
    checkBtn.textContent = 'X';
    checkBtn.style = 'color: white; font-weight: 900;padding: 0;border-radius: 3px;height: 20px; width: 20px; background-color: red; border: 1px solid black;margin-right: 20px;'
    h2.innerText = text;
    node.style = 'border-bottom: 1px solid black;padding-left: 10px; align-items: center;justify-content: space-between; background-color: transparent; margin-top: 10px;; display: flex;font-size: 10px; color: white; height: 40px;width: 100%;'

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
