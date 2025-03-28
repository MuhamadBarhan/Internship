import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
    @tracked students = [
        {
            name: "Muhamad",
            reg: 962821205034,
            dept: "IT",
            clg: "UCEN"
        },
        {
            name: "Abishek",
            reg: 962821205003,
            dept: "IT",
            clg: "UCEN"
        },
        {
            name: "Aswin",
            reg: 962821205016,
            dept: "IT",
            clg: "UCEN"
        },
        {
            name: "Ruban",
            reg: 962821205047,
            dept: "CSE",
            clg: "UCEN"
        },
        {
            name: "Surya",
            reg: 962821205038,
            dept: "CSE",
            clg: "UCEN"
        },
        {
            name: "Nithin",
            reg: 962821205037,
            dept: "IT",
            clg: "UCEN"
        },
        {
            name: "Jees",
            reg: 962821205050,
            dept: "IT",
            clg: "UCEN"
        },
        {
            name: "Nithish",
            reg: 962821205040,
            dept: "IT",
            clg: "UCEN"
        },
        {
            name: "Jones",
            reg: 962821205008,
            dept: "IT",
            clg: "UCEN"
        },
    ];

    @tracked isFormVisible = false;
    @tracked isOverlayVisible = false;
    @tracked editStudent = null;

    @action addRow(student) {
        this.students = [...this.students, student];
    }

    @action deleteRow(reg) {
        this.students = this.students.filter(student => student.reg !== reg);
    }

    @action editRow(reg) {
        this.editStudent = this.students.find(student => student.reg === reg);
        this.openForm();
    }

    @action updateStudents(updatedStudents) {
        this.students = [...updatedStudents]; 
    }

    @action bulkDelete() {
        let checkboxes = document.querySelectorAll("#table input[type='checkbox']:checked");
        if (!checkboxes.length) {
            alert("Select one or more rows to bulk delete");
            return;
        }

        checkboxes.forEach(checkbox => {
            let row = checkbox.parentElement.parentElement;
            this.deleteRow(row.cells[2].textContent);
            row.remove();
        });
    }

    @action searchTable(event) {
        let input = event.target.value.toLowerCase();
        let rows = document.querySelectorAll("#table tr");

        rows.forEach((row, index) => {
            if (index === 0) return;
            row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
        });
    }

    @action openForm() {
        this.isFormVisible = true;
        this.isOverlayVisible = true;
    }

    @action closeForm() {
        this.isFormVisible = false;
        this.isOverlayVisible = false;
        this.editStudent = null;
    }
}
