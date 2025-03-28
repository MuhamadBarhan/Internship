import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class StudentsEditController extends Controller {
    @service router;
    @service students;

    @action updateStudents(updatedStudents) {
        this.students.students = updatedStudents; 
        this.router.transitionTo('students');
    }    

    @action closeForm() {
        this.router.transitionTo('students');
    }
}
