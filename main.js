let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tab div")
let taskList = []
let mode = "all"
let filterList = []
let underLine = document.getElementById("under-line")

const randomIDGenerate = () => {
    return Math.random().toString(36).substring(2, 11);
}

document.addEventListener("DOMContentLoaded", () => {
    const initialTab = tabs[1];
    underLine.style.left = initialTab.offsetLeft + "px";
    underLine.style.width = initialTab.offsetWidth + "px";
    underLine.style.top = initialTab.offsetTop - 8 + initialTab.offsetHeight + "px";
    addButton.disabled = true
});

const filter = (event) => {
    mode = event.target.id
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px"
    underLine.style.top = event.currentTarget.offsetTop - 8 + event.currentTarget.offsetHeight + "px"
    if (mode == "all") {
        render()
    } else if (mode === "going") {
        filterList = taskList.filter(list => list.fin === false)
    } else if (mode === "done") {
        filterList = taskList.filter(list => list.fin === true)
    }
    render()
}

tabs.forEach((item, index) => {
    if (index === 0) {
        return;
    }
    item.addEventListener("click", (event) => filter(event))
})

taskInput.addEventListener("input",()=>{
    if(taskInput.value === ""){
        addButton.disabled = true
    }else{
        addButton.disabled =false
    }
})

const addTask = () => {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        fin: false
    }
    taskList.push(task)
    taskInput.value = ""
    addButton.disabled = true
    render()
}

addButton.addEventListener("click", addTask);

const toggleFIn = (id) => {

    taskList.forEach(list => {
        if (list.id == id) {
            list.fin = !list.fin
        }
    }
    )
    render()
}

const del = (id) => {
    taskList = taskList.filter(list => list.id !== id)
    filterList = filterList.filter(list => list.id !== id)
    render()
}


const render = () => {
    let resultHTML = ``
    let list = []
    if (mode === "all") {
        list = taskList
    } else if (mode === "going" || "done") {
        list = filterList
    }
    list.map(list => {
        if (list.fin == true) {
            resultHTML += `
            <div class="task fin-bg">
            <div class="d-flex align-items-center">
                <button class="btn btn-success round me-2" onClick="toggleFIn('${list.id}')"><i class="fa-solid fa-check"></i></button>
                <div class="fin">${list.taskContent}</div>
            </div>

                <div>

                    <button class="btn" onClick="del('${list.id}')"><i class="fa-solid fa-trash red"></i></button>
                </div>
            </div>
            `
        } else {
            resultHTML += `
        <div class="task">
            <div class="d-flex align-items-center">              
                <button class="btn btn-outline-success round me-2" onClick="toggleFIn('${list.id}')"><i class="fa-solid fa-check"></i></i></button>
                <div>${list.taskContent}</div>
            </div>
            <div>
                <button class="btn" onClick="del('${list.id}')"><i class="fa-solid fa-trash red"></i></button>
            </div>
        </div>
        `}
    }
    )

    document.getElementById("task-board").innerHTML = resultHTML
}