import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class StudentsEditController extends Controller {
    @service router;
    @service students;
    @service flashMessages;

    @action updateStudents(updatedStudents) {
        this.students.filteredStudents = updatedStudents;
        this.router.transitionTo('students');
        this.flashMessages.success(htmlSafe('<i class="bi bi-check-circle-fill"></i> Student updated succcessfully!'));
    }    

    @action closeForm() {
        this.router.transitionTo('students');
    }
}
