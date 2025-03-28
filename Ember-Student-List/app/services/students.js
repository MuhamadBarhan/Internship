import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class StudentsService extends Service {
    @tracked students = [
            { name: "Muhamad", reg: 962821205034, dept: "IT", clg: "UCEN" },
            { name: "Abishek", reg: 962821205003, dept: "IT", clg: "UCEN" },
            { name: "Aswin", reg: 962821205016, dept: "IT", clg: "UCEN" },
            { name: "Ruban", reg: 962821205047, dept: "CSE", clg: "UCEN" },
            { name: "Surya", reg: 962821205038, dept: "CSE", clg: "UCEN" },
            { name: "Nithin", reg: 962821205037, dept: "IT", clg: "UCEN" },
            { name: "Jees", reg: 962821205050, dept: "IT", clg: "UCEN" },
            { name: "Nithish", reg: 962821205040, dept: "IT", clg: "UCEN" },
            { name: "Jones", reg: 962821205008, dept: "IT", clg: "UCEN" },
        ];;
    
    addStudent(student) {
        this.students = [...this.students, student];
    }

}
