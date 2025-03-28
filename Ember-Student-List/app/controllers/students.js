import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class StudentsController extends Controller {

    @service router;
    @service students;
    @tracked isFormVisible = false;
    @tracked editStudent = null;

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

    @action deleteRow(reg) {
        this.students.students = this.students.students.filter(student => student.reg !== reg);
    }

    @action editRow(reg) {
        this.editStudent = this.students.students.find(student => student.reg === reg);
        this.router.transitionTo('students.edit', reg);
    }


}