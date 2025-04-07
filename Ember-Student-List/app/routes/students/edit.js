import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class StudentsEditRoute extends Route {
    
    @service students; 

    model(params) {
        return this.students.students.find(student => student.reg == Number(params.reg));
    }
}
