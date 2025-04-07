import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class StudentsAddController extends Controller {
    @service router;
    @service students;
    @service flashMessages;

    @action addRow(student) {
        this.students.students = [...this.students.students, student];  
        this.students.filteredStudents = this.students.students;
        this.router.transitionTo('students');
        this.flashMessages.success("Student added succcessfully!");
    }

    @action closeForm() {
        this.router.transitionTo('students');
    }
}
