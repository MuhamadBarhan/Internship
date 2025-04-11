import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default class StudentsController extends Controller {

    @service router;
    @service students;
    @service flashMessages;
    @tracked isFormVisible = false;
    @tracked editStudent = null;
    @tracked selectAll = false;
    @tracked isDarkMode = false;

    get currentRoute() {
        return this.router.currentRouteName;
    }

    @action addStud() {
        this.router.transitionTo('students.add');
    }

    @action toggleSelectAll(event) {
        this.selectAll = event.target.checked;

        let checkboxes = document.querySelectorAll("#table input[type='checkbox']");
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.selectAll;
        });
    }

    @task
    *searchTable(event) {
        let input = event.target.value.toLowerCase();
        yield timeout(300);
        this.students.searchStudents(input);
    }

    @action handleSearch(event) {
        this.searchTable.perform(event);
    }

    @action bulkDelete() {
        let checkboxes = document.querySelectorAll("#table input[type='checkbox']:checked");

        if (!checkboxes.length) {
            this.flashMessages.warning('Select one or more rows to delete');
            return;
        }

        let selectedRegs = Array.from(checkboxes).map(checkbox => {
            let row = checkbox.closest("tr");
            return row.cells[1].textContent.trim();
        });

        this.students.filteredStudents = this.students.filteredStudents.filter(
            student => !selectedRegs.includes(String(student.reg)));

        this.selectAll = false;
        checkboxes.forEach(checkbox => checkbox.checked = false);

        this.flashMessages.success('Selected students deleted successfully', { timeout: 2000 });
    }

    @action deleteRow(reg) {
        this.students.filteredStudents = this.students.filteredStudents.filter(student => student.reg !== reg);
        this.flashMessages.success('Deleted');
    }

    @action editRow(reg) {
        this.editStudent = this.students.filteredStudents.find(student => student.reg === reg);
        this.router.transitionTo('students.edit', reg);
    }

    @action toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        const newTheme = this.isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }
}
