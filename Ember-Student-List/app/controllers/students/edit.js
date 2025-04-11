import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class StudentsEditController extends Controller {
    @service router;
    @service students;
    @service flashMessages;

    @action updateStudents(updatedStudents) {
        this.students.filteredStudents = updatedStudents;
        this.router.transitionTo('students');
        this.flashMessages.success("Student updated succcessfully!");
    }    

    @action closeForm() {
        this.router.transitionTo('students');
    }
}
