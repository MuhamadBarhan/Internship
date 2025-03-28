import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class StudentsAddController extends Controller {
    @service router;
    @service students;

    @action addRow(student) {
        this.students.addStudent(student);  
        console.log("Updated Students List:", this.students.students);
        this.router.transitionTo('students');
    }

    @action closeForm() {
        this.router.transitionTo('students');
    }
}
