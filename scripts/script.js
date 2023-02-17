import { addNewTask, handleTaskBehaviour, fillTasksList } from "./functions.js";
// 1. щоб при насканні на кнопку add текст додавався до списку - отримати доступ до елементів

const myInput = document.getElementById("myInput");
const addBtn = document.getElementById("addBtn");
const myUL = document.getElementById("myUL");
//повісимо обробник подій на кнопку
addBtn.addEventListener("click", addNewTask);
//треба щоб задача відмічалась як зроблена при натисканні на неї і навпаки
myUL.addEventListener("click", handleTaskBehaviour);
window.addEventListener("DOMContentLoaded", fillTasksList);
