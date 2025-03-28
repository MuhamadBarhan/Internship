import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class StudentsAddRoute extends Route {

    @service students;

    model() {

        return { students:this.students.students, newStudent: { name: '', reg: '', dept: '', clg: '' } };
    }
}
