import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class StudentsService extends Service {
  @tracked students = [];
  @tracked filteredStudents = [];
  @tracked items = [];

  constructor() {
    super(...arguments);
    this.loadStudents(); 
  }

  async loadStudents() {
    let response = await fetch('/students-data.json');
    let data = await response.json();
    this.students = data.students;
    this.filteredStudents = this.students;
    this.items = data.items;
  }

  searchStudents(query, searchColumns = ['name', 'dept', 'clg']) {
    query = query.toLowerCase();

    this.filteredStudents = this.students.filter(student => {
      return searchColumns.some(column => {
        switch (column) {
          case 'reg':
            return student.reg.toString().toLowerCase().includes(query);
          case 'skills':
            return student.skills.join(' ').toLowerCase().includes(query);
          case 'name':
          case 'dept':
          case 'clg':
            return student[column]?.toLowerCase().includes(query);
          default:
            return false;
        }
      });
    });
  }
}
