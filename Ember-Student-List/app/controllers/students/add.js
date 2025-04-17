import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class StudentsAddController extends Controller {
    @service router;
    @service students;
    @service flashMessages;

    @action addRow(student) {
        this.students.students = [...this.students.students, student];  
        this.students.filteredStudents = this.students.students;
        this.router.transitionTo('students');
        this.flashMessages.success(htmlSafe('<i class="bi bi-check-circle-fill"></i> Student added succcessfully!'));
    }

    @action closeForm() {
        this.router.transitionTo('students');
    }
}
