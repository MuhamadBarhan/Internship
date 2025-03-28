document.addEventListener("DOMContentLoaded", loadRows);

let formContainer = document.getElementById('formCont');
let overLay = document.getElementById('overlay');

function addRow() {
    let name = document.getElementById("name").value;
    let reg = document.getElementById("reg").value;
    let dept = document.getElementById("dept").value;
    let clg = document.getElementById("clg").value;

    let table = document.getElementById("table");
    let row = table.insertRow();
    row.innerHTML = `<td><input type="checkbox"></td><td>${name}</td><td>${reg}</td><td>${dept}</td><td>${clg}</td><td><button onclick="deleteRow(this, '${reg}')"><i class="fa-solid fa-trash"></i>Delete</button></td>`;

    saveLoc({ name, reg, dept, clg });

    document.getElementById("name").value = "";
    document.getElementById("reg").value = "";
    document.getElementById("dept").value = "";
    document.getElementById("clg").value = "";
    formContainer.style.display="none";
    overLay.style.display="none";
}

function deleteRow(button, reg) {
    button.parentElement.parentElement.remove();
    removeLoc(reg);
}

function saveLoc(student) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

function removeLoc(reg) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.reg !== reg);
    localStorage.setItem("students", JSON.stringify(students));
}

function searchTable() {
    let input = document.getElementById("search").value.toLowerCase();
    let tRows = document.querySelectorAll("#table tr");

    tRows.forEach((row, index) => {
        if (index === 0) return;
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

function bulkDelete() {
    let checkboxes = document.querySelectorAll("#table input[type='checkbox']:checked");

    if(![...checkboxes].some(checkbox=>checkbox.checked)) {
        alert("Select some rows to bulk delete");
    }

    checkboxes.forEach(checkbox => {
        let row = checkbox.parentElement.parentElement;
        removeLoc(row.cells[2].textContent); 
        row.remove(); 
    });
}

function loadRows() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let table = document.getElementById("table");

    students.forEach(student => {
        let row = table.insertRow();
        row.innerHTML = `<td><input type="checkbox"></td><td>${student.name}</td><td>${student.reg}</td><td>${student.dept}</td><td>${student.clg}</td><td><button onclick="deleteRow(this, '${student.reg}')"><i class="fa-solid fa-trash"></i>Delete</button></td>`;
    });
}

function openMod() {
    formContainer.style.display="flex";
    overLay.style.display="block";
}

function closeMod() {
    formContainer.style.display="none";
    overLay.style.display="none";
}