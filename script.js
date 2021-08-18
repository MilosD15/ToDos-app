const input = document.querySelector('main .input input[type="text"]');
input.focus();

let todos_list = [];

function makeDoing(text) {
    const doings = document.querySelectorAll("main .todos .doing"); 
    var checking = 1;        
    doings.forEach( todo => {
        const doing = todo.querySelector("span");
        if(doing.innerText == text) checking = 0;
    });
    if(checking == 0) return;
    const todos = document.querySelector("main .todos");
    const doing = document.createElement("div");
    doing.classList.add("doing");
    const div = document.createElement("div");
    div.classList.add("additional");
    doing.appendChild(div);
    const span = document.createElement("span");
    var first_letter = text.substr(0, 1);
    first_letter = first_letter.toUpperCase();
    text = text.substr(1);
    span.innerText = first_letter + text;
    const check = document.createElement("i");
    check.classList.add("fa","fa-check");
    check.addEventListener("click", e => {
        const wrapper = e.composedPath()[1].querySelector(".additional");
        wrapper.style.backgroundColor = "rgba(3, 158, 3, 0.712)";
        wrapper.style.animationName = "colorCorection";
        e.composedPath()[1].style.animationName = "finished";
        e.composedPath()[1].style.animationDelay = "0.5s";
        var element = e.composedPath()[1];
        setTimeout(remove, 1300, element);
    });
    const times = document.createElement("i");
    times.classList.add("fas", "fa-times");
    times.addEventListener("click", e => {
        const wrapper = e.composedPath()[1].querySelector(".additional");
        wrapper.style.backgroundColor = "rgba(226, 3, 3, 0.555)";
        wrapper.style.animationName = "colorCorection";
        e.composedPath()[1].style.animationName = "notFinished";
        e.composedPath()[1].style.animationDelay = "0.5s";
        setTimeout(change, 1300, wrapper, e.composedPath()[1]);
    });
    doing.appendChild(span);
    doing.appendChild(check);
    doing.appendChild(times);
    doing.style.animationName = "adding";
    doing.style.animationDelay = "0";
    todos.appendChild(doing);

    function remove(element) {
        element.style.display = "none";
        element.parentNode.removeChild(element);
    }

    function change(wrapper, element) {
        element.style.animationName = "none";
        wrapper.style.animationName = "none";
    }
    
    input.value = "";
}

const add_btn = document.querySelector("main .input button");
add_btn.addEventListener("click", e => {
    e.preventDefault();
    if(input.value != "" && input.value != null && input.value != undefined) {
        makeDoing(input.value);
        input.focus();
    }
});

const input_field = document.querySelector('main .input input[type="text"]');
input_field.addEventListener("keydown", e => {
    if(e.key == "Enter") {
        if(input.value != "" && input.value != null && input.value != undefined) {
            makeDoing(input.value);
            input.focus();
        }
    }
    if(e.ctrlKey == true && (e.key == "m" || e.key == "M")) {
        SendEmail();
    }
    console.log(e);
});

window.addEventListener("load", () => {
    todos_list = JSON.parse(localStorage.getItem("todos"));
    todos_list = deleteDuplicates(todos_list);
    todos_list.forEach(doing => {
        makeDoing(doing);
    });
});
window.addEventListener("unload", () => {
    // localStorage.setItem("todos", "");
    let doings = document.querySelectorAll("main .todos .doing");
    todos_list = [];
    doings.forEach( todo => {
        const doing = todo.querySelector("span");
        todos_list.push(doing.innerText);
    });
    localStorage.setItem("todos", JSON.stringify(todos_list));
});

function deleteDuplicates(array) {
    var newArr = [];
    if(array == null || array == undefined) return newArr;
    var br;
    for(let i = 0; i < array.length; i++) {
        if(i == 0) newArr.push(array[i]);
        br = 1;
        for(let k = 0; k < newArr.length; k++) {
            if(array[i] == newArr[k])
                br = 0;
        }
        if(br == 1) {
            newArr.push(array[i]);
        }
    }
    return newArr;
}

function showMessageBox(message, backColor = "darkgreen", color = "white")
{
    var con = document.querySelector(".full");
    var messageBox = document.querySelector(".full .alert .message");
    var okBtn = document.querySelector(".full .alert .btn button");
    messageBox.innerHTML = message;
    con.style.opacity = 1;
    con.style.pointerEvents = "all";
    con.style.animationName = "alert";
    okBtn.style.backgroundColor = backColor;
    okBtn.style.color = color;
}
// OK button of alert box and its event click
var alertBtn = document.querySelector(".full .alert .btn button");
alertBtn.addEventListener("click", e => {
    e.preventDefault();
    var con = document.querySelector(".full");
    con.style.opacity = 0;
    con.style.pointerEvents = "none";
    con.style.animationName = "none";
})

const email_btn = document.querySelector("main .input button:last-child");
email_btn.addEventListener("click", SendEmail);

function SendEmail() {
    const image_link = "https://drive.google.com/uc?id=1UAGgJ0U4HR2tvqZkIcgjHaaBa9j7R--p";
    let bodyMail = '<div style="border: 2px solid black; padding: 0;"><h1 style="background-color: #40B7AD;'
    bodyMail += 'height: 120px; width: 100%; text-align: center; line-height: 120px; font-style: italic;';
    bodyMail += 'color: black;  font-family: \'Poppins\', sans-serif; font-size: 2rem; margin: 0;';
    bodyMail += 'border-bottom: 2px solid black;">Todos</h1><div class="todos" style="background-color: #DEF2F0;">';
    bodyMail += '<ul style="list-style: decimal; font-family: \'Poppins\', sans-serif; font-size: 1.3rem;';
    bodyMail += 'color: #E45E50; background-color: #DEF2F0; padding: 40px 0 40px 45px; margin: 0;">';
    const ToDos = document.querySelectorAll("main .todos .doing");
    for(let i = 0; i < ToDos.length; i++) {
        var span = ToDos[i].querySelector("span");
        bodyMail += `<li style="padding: 5px;">${span.innerText}</li>`;
    }
    bodyMail += '</ul><div class="image" style="height: auto; width: 100%; padding-bottom: 20px;">';
    bodyMail += `<img src="${image_link}" `;
    bodyMail += 'alt="ToDo image" style="border-radius: 50%; border: 2px solid black;';
    bodyMail += 'margin-left: 35%; transform: translateX(-50%);"></div></div></div>';
    Email.send({
        Host : "smtp.gmail.com",
        Username : "milosdronjak47@gmail.com",
        Password : "kymqjoktlkwgmbma",
        To : "milosdronjak47@gmail.com",
        From : "milosdronjak47@gmail.com",
        Subject : "ToDos for today",
        Body : bodyMail
    }).then( () => {
        showMessageBox("Done! &#9989;", "darkblue");
        setTimeout( () => {
            var con = document.querySelector(".full");
            con.style.opacity = 0;
            con.style.pointerEvents = "none";
            con.style.animationName = "none";
        }, 2500);
        setTimeout(() => {
            input.focus();
        }, 2600);
    });
}