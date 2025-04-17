import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class StudentFormComponent extends Component {
    @service flashMessages;

    @tracked name = this.args.editStudent?.name || '';
    @tracked reg = this.args.editStudent?.reg || '';
    @tracked selectedSkills = this.args.editStudent?.skills || [];
    @tracked dept = this.args.editStudent?.dept || null;
    @tracked clg = this.args.editStudent?.clg || '';
    @tracked isEditing = !!this.args.editStudent;

    skills = ['JavaScript', 'React', 'Spring Boot', 'Flutter', 'MySQL', 'Node.js', 'CSS', 'HTML'];

    @action updateSkills(selected) {
        this.selectedSkills = selected;
        console.log(this.selectedSkills);
    }
    
    departments = ['IT', 'CSE', 'ECE', 'MECH'];
    @action updateDept(selectedDept) {
        this.dept = selectedDept;
    }

    @action updateName(event) {
        this.name = event.target.value;
    }

    @action updateReg(event) {
        this.reg = event.target.value;
    }


    @action updateClg(event) {
        this.clg = event.target.value;
    }

    @action saveStudent() {

        if (!this.name || !this.reg || !this.dept || !this.clg || this.selectedSkills.length === 0) {
            this.flashMessages.warning(htmlSafe('<i class="bi bi-exclamation-triangle-fill"></i> Fill all the details'));
            return;
        }

        if (this.isEditing) {
            let updatedStudents = this.args.students.map(student =>
                student.reg === this.reg
                    ? { ...student, name: this.name, dept: this.dept,skills: this.selectedSkills, clg: this.clg }
                    : student
            );

            this.args.updateStudents(updatedStudents);
        } else {
            this.args.addRow({
                name: this.name,
                reg: this.reg,
                dept: this.dept,
                skills: this.selectedSkills,
                clg: this.clg
            });
        }

        this.args.closeForm();
    }

    @action handleEnter(event) {
        event.preventDefault();
        if (event.key === "Enter") {
            this.saveStudent();
        }
    }

}
