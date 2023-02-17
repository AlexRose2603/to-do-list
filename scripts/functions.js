import { save, load } from "./storage.js";

const STORAGE_KEY = "tasks";
let currentId = 0;
const myInput = document.getElementById("myInput");

function fillTasksList() {
  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined || currentState.length === 0) {
    currentState.forEach(({ text, isDone, id }) => createLI(text, isDone, id));
    currentId = currentState[currentState.length - 1].id + 1;
  }
}

function addNewTask() {
  //отримати доступ до значення яке зберігається у цьому інпуті та
  //зробити перевірку на пусту строку(trim())
  const inputValue = myInput.value.trim();
  if (inputValue === "") {
    alert("Write something!");
    return;
  }
  createLI(inputValue);
  //очистити інпут (замінити значення інпуту на пусту строку)
  myInput.value = "";
  addTaskToStorage(inputValue);
}
//у новій функції створити лі яка потім піде у наш блок
function createLI(text, isDone = false, id = currentId) {
  const liEl = document.createElement("LI");
  const liText = document.createTextNode(text);
  liEl.appendChild(liText);
  liEl.dataset.id = id;
  if (isDone) liEl.classList.add("checked");
  myUL.appendChild(liEl);
  addCross(liEl);
}

function handleTaskBehaviour({ target }) {
  //у консоль повернеться pointer event де target буде вибрана li
  //ще треба перевіряти що ми натискаємо саме на лі
  //потім зробити перевірку щоб при натисканні на крестик лішка видалялась
  const currentState = load(STORAGE_KEY);
  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    // треба відмічати зроблена чи незроблена задача
    const taskIndex = currentState.findIndex(
      (task) => +task.id === +target.dataset.id
    );
    currentState[taskIndex].isDone = !currentState[taskIndex].isDone;
  } else if (target.classList.contains("close")) {
    target.parentNode.remove();
    const taskIndex = currentState.findIndex(
      (task) => +task.id === +target.parentNode.dataset.id
    );
    currentState.splice(taskIndex, 1);
  }
  save(STORAGE_KEY, currentState);
  //натиснувши на цей крестик потрібно видалити лішку в якій він є
}

function addCross(target) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  target.appendChild(span);
}
//у об'єкта буде текст і статус виконано чи ні; у кожного об'єкта повине бути ID
//формування об'єкту(після натискання add) в який ми будемо записувати нашу задачу
function createTaskObject(text, isDone = false) {
  return {
    text,
    isDone,
    id: currentId,
  };
}
function addTaskToStorage(text, isDone = false) {
  const currentState = load(STORAGE_KEY);
  //зробити перевірку - якщо ЛС пустий, то створити масив, в який додамо 1шу задачу, якщо ні, то дадавати в уже існуючий
  if (currentState === undefined) {
    save(STORAGE_KEY, [createTaskObject(text, isDone)]);
  } else {
    currentState.push(createTaskObject(text, isDone));
    save(STORAGE_KEY, currentState);
  }
  currentId += 1;
}

//зробити так, щоб при перезавантаженні сторінки наші таски завантажувались у список
export { addNewTask, handleTaskBehaviour, fillTasksList };
