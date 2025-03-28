import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StudentFormComponent extends Component {
    @tracked name = this.args.editStudent?.name || '';
    @tracked reg = this.args.editStudent?.reg || '';
    @tracked dept = this.args.editStudent?.dept || '';
    @tracked clg = this.args.editStudent?.clg || '';
    @tracked isEditing = !!this.args.editStudent;

    @action updateName(event) {
        this.name = event.target.value;
    }

    @action updateReg(event) {
        this.reg = event.target.value;
    }

    @action updateDept(event) {
        this.dept = event.target.value;
    }

    @action updateClg(event) {
        this.clg = event.target.value;
    }

    @action saveStudent() {

        if(!this.name || !this.reg || !this.dept || !this.clg) {
            alert("Fill all the rows");
            return;
        }

        if (this.isEditing) {
            let updatedStudents = this.args.students.map(student =>
                student.reg === this.reg
                    ? { ...student, name: this.name, dept: this.dept, clg: this.clg }
                    : student
            );
            this.args.updateStudents(updatedStudents);
        } else {
            this.args.addRow({
                name: this.name,
                reg: this.reg,
                dept: this.dept,
                clg: this.clg
            });
        }


        this.args.closeForm();
    }
}
