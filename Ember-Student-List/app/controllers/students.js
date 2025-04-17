import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';

export default class StudentsController extends Controller {

  @service router;
  @service students;
  @service flashMessages;
  @tracked isFormVisible = false;
  @tracked editStudent = null;
  @tracked selectAll = false;
  @tracked isDarkMode = false;
  @tracked isAscending = true;
  @tracked recentlyDeletedStudents = [];
  
  @tracked isFilterVisible = false; 
  @tracked filter = {
    depts: [],
    skills: []
  };
  
  @tracked isCustomizeVisible = false;
  @tracked visibleColumns = ['reg', 'name', 'dept', 'skills', 'college']; 
  
  @computed('filter.depts.[]')
  get isDeptChecked() {
    return (dept) => {
      return this.filter.depts.includes(dept);
    };
  }
  
  get currentRoute() {
    return this.router.currentRouteName;
  }

  @action toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  @action toggleCustomize() {
    this.isCustomizeVisible = !this.isCustomizeVisible;
  }

  get availableDepartments() {
    let depts = this.students.students.map(student => student.dept);
    return [...new Set(depts)];
  }

  get availableSkills() {
    let allSkills = this.students.students.flatMap(student => student.skills || []);
    return [...new Set(allSkills)];
  }

  @action applyFilter() {
    this.isFilterVisible = !this.isFilterVisible;
    this.students.filteredStudents = this.students.students.filter(student => {
      let { depts, skills } = this.filter;

      if (depts.length && !depts.includes(student.dept)) {
        return false;
      }

      if (skills.length && !skills.every(skill => student.skills.includes(skill))) {
        return false;
      }

      return true; 
    });
    this.flashMessages.success(htmlSafe('<i class="bi bi-check-circle-fill"></i> Filters applied'));
  }

  @action clearAllFilters() {
    this.filter = {
      depts: [],
      skills: []
    };
    this.isFilterVisible = false;
    this.students.filteredStudents = [...this.students.students];
  }

  @action updateDeptFilter(event) {
    let value = event.target.value;
    let isChecked = event.target.checked;

    if (isChecked) {
      this.filter = {
        ...this.filter,
        depts: [...this.filter.depts, value]
      };
    } else {
      this.filter = {
        ...this.filter,
        depts: this.filter.depts.filter(dept => dept !== value)
      };
    }
  }


  @action updateSkillsFilter(event) {
    let value = event.target.value;
    let isChecked = event.target.checked;

    if (isChecked) {
      this.filter = {
        ...this.filter,
        skills: [...this.filter.skills, value]
      };
    } else {
      this.filter = {
        ...this.filter,
        skills: this.filter.skills.filter(skill => skill !== value)
      };
    }
  }

  @action toggleColumnVisibility(column) {
    if (this.visibleColumns.includes(column)) {
      this.visibleColumns = this.visibleColumns.filter(c => c !== column);
    } else {
      this.visibleColumns = [...this.visibleColumns, column];
    }
  }
  
  @action isColumnVisible(column) {
    return this.visibleColumns.includes(column);
  }
  
  @action sortByName() {
    const sorted = [...this.students.filteredStudents].sort((a, b) => {
      return this.isAscending
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    });
    console.log(this.isAscending)

    this.students.filteredStudents = sorted;
    this.isAscending = !this.isAscending;
  }


  @action addStud() {
    this.router.transitionTo('students.add');
  }

  @action toggleSelectAll(event) {
    this.selectAll = event.target.checked;

    let checkboxes = document.querySelectorAll("#table input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.selectAll;
    });
  }

  @task
  *searchTable(event) {
    let input = event.target.value.toLowerCase();
    yield timeout(300);
    this.students.searchStudents(input);
  }

  @action handleSearch(event) {
    this.searchTable.perform(event);
  }

  @action bulkDelete() {
    let checkboxes = document.querySelectorAll("#table input[type='checkbox']:checked");

    if (!checkboxes.length) {
      this.flashMessages.warning(htmlSafe('<i class="bi bi-exclamation-triangle-fill"></i> Select one or more rows to delete'));
      return;
    }

    let selectedRegs = Array.from(checkboxes).map(checkbox => {
      let row = checkbox.closest("tr");
      return row.cells[1].textContent.trim();
    });

    this.students.filteredStudents = this.students.filteredStudents.filter(
      student => !selectedRegs.includes(String(student.reg)));

    this.selectAll = false;
    checkboxes.forEach(checkbox => checkbox.checked = false);

    this.flashMessages.success(htmlSafe('<i class="bi bi-check-circle-fill"></i> Selected students deleted successfully', { timeout: 2000 }));
  }

  @action deleteRow(reg) {
    const index = this.students.filteredStudents.findIndex(s => s.reg === reg);
    const student = this.students.filteredStudents[index];

    this.students.filteredStudents = this.students.filteredStudents.filter(s => s.reg !== reg);

    const id = Date.now();
    this.recentlyDeletedStudents.push({ id, student, index });

    this.flashMessages.add({
      type: 'success',
      message: htmlSafe(`<i class="bi bi-check-circle-fill"></i> Student deleted. <button class="undo-btn" data-id="${id}">Undo</button>`),
      timeout: 5000,
      sticky: true,
    });

    setTimeout(() => {
      const undoBtn = document.querySelector(`.undo-btn[data-id="${id}"]`);
      if (undoBtn) {
        undoBtn.addEventListener('click', () => this.undoDelete(id));
      }
    }, 0);

    setTimeout(() => {
      this.recentlyDeletedStudents = this.recentlyDeletedStudents.filter(item => item.id !== id);
    }, 5000);
  }


  @action undoDelete(id) {
    const entry = this.recentlyDeletedStudents.find(item => item.id === id);
    if (entry) {
      const studentsCopy = [...this.students.filteredStudents];
      studentsCopy.splice(entry.index, 0, entry.student);
      this.students.filteredStudents = studentsCopy;

      this.recentlyDeletedStudents = this.recentlyDeletedStudents.filter(
        item => item.id !== id
      );

      this.flashMessages.success(htmlSafe('<i class="bi bi-check-circle-fill"></i> Undo successful!'));
    }
  }

  @action editRow(reg) {
    this.editStudent = this.students.filteredStudents.find(student => student.reg === reg);
    this.router.transitionTo('students.edit', reg);
  }

  @action toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}
