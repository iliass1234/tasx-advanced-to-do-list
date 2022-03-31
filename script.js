let textArea = document.querySelector('#task-generator > input');
let leftSide = document.querySelector('aside');

let textOnFocus = false;

function createAtask(text){
    let node = document.createElement('div');
    let checkBtn = document.createElement('button');
    let h2 = document.createElement('h2');
    checkBtn.textContent = 'text';
    h2.innerText = text;
    node.style = 'background-color: blue;margin: 5px 10px; display: flex;gap: 10px; font-size: 10px; color: red; height: 40px;width: 100%;'
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
            console.log('hejkd')
            console.log(leftSide.firstChild)
            
        }
        console.log(textArea.value)
        leftSide.insertBefore(createAtask(textArea.value), leftSide.firstChild)
        textArea.value = '';
    }
}
