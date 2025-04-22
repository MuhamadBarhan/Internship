import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class StudentsController extends Controller {

  @service router;
  @service students;
  @service flashMessages;
  @tracked isFormVisible = false;
  @tracked editStudent = null;
  @tracked selectAll = false;
  @tracked isDarkMode = false;

  @tracked sortKey = 'name';
  @tracked isAscending = true;

  @tracked recentlyDeletedStudents = [];

  @tracked isFilterVisible = false;
  @tracked filter = {
    depts: [],
    skills: []
  };

  @tracked isCustomizeVisible = false;
  @tracked visibleColumns = ['reg', 'name', 'dept', 'skills', 'clg'];

  @tracked searchColumns = ['name'];
  @tracked lastSearchQuery = '';

  @tracked expandedRows = [];

  @tracked DEFAULT_COLUMNS = [];
  @tracked items = [];

  constructor() {
    super(...arguments);
    this.students.loadStudents().then(() => {
      this.DEFAULT_COLUMNS = this.students.items;
      this.items = this.loadSavedColumns();
    });
  }

  loadSavedColumns() {
    try {
      const saved = localStorage.getItem('studentColumns');
      return saved ? JSON.parse(saved) : this.DEFAULT_COLUMNS;
    } catch (e) {
      console.error('Failed to load saved columns', e);
      return this.DEFAULT_COLUMNS;
    }
  }

  @action reorderItems(itemModels) {
    this.items = itemModels;
    this.saveColumns();
  }

  @action resetColumns() {
    this.items = [...this.DEFAULT_COLUMNS];
    this.saveColumns();
  }

  saveColumns() {
    try {
      localStorage.setItem('studentColumns', JSON.stringify(this.items));
    } catch (e) {
      console.error('Failed to save columns', e);
    }
  }

  @action toggleRow(reg) {
    if (this.expandedRows.includes(reg)) {
      this.expandedRows = this.expandedRows.filter(r => r !== reg);
    } else {
      this.expandedRows = [...this.expandedRows, reg];
    }
  }

  get isDeptChecked() {
    return (dept) => {
      return this.filter.depts.includes(dept);
    };
  }

  get currentRoute() {
    return this.router.currentRouteName;
  }

  @action makeResizable(th) {
    let resizer = th.querySelector('.resizer');
    if (!resizer) return;

    const key = th.getAttribute('data-key');
    const minWidth = 100;

    let savedWidth = localStorage.getItem(`col-width-${key}`);
    if (savedWidth) {
      th.style.width = `${savedWidth}px`;
    }

    let startX, startWidth;

    const onMouseDown = (e) => {
      startX = e.pageX;
      startWidth = th.offsetWidth;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      let diff = e.pageX - startX;
      let newWidth = startWidth + diff;
      if (newWidth < minWidth) return;

      th.style.width = `${newWidth}px`;
    };

    const onMouseUp = () => {
      const finalWidth = th.offsetWidth;
      localStorage.setItem(`col-width-${key}`, finalWidth);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    resizer.addEventListener('mousedown', onMouseDown);
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
    this.flashMessages.success(htmlSafe('<i class="bi bi-check-circle-fill"></i> Filters cleared'));
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

  @action sortByKey(key) {
    this.sortKey = key;
    console.log(this.sortKey)

    let sorted = [...this.students.filteredStudents].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      if (Array.isArray(aVal)) aVal = aVal.join(', ');
      if (Array.isArray(bVal)) bVal = bVal.join(', ');

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return this.isAscending
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return this.isAscending ? aVal - bVal : bVal - aVal;
      }
    });

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

  @action handleSearch(event) {
    const query = event.target.value.toLowerCase();
    this.lastSearchQuery = query;
    this.students.searchStudents(query, this.searchColumns);
  }

  get selectedColumnValues() {
    return this.searchColumns.map(key => {
      return this.items.find(opt => opt.key === key);
    }).filter(Boolean);
  }

  @action
  updateSearchColumns(selected) {
    this.searchColumns = selected.map(item => item.key);

    if (this.lastSearchQuery) {
      this.students.searchStudents(this.lastSearchQuery, this.searchColumns);
    }
  }

  @action bulkDelete() {
    let checkboxes = document.querySelectorAll("#table input[type='checkbox']:checked");

    if (!checkboxes.length) {
      this.flashMessages.warning(htmlSafe('<i class="bi bi-exclamation-triangle-fill"></i> Select one or more rows to delete'));
      return;
    }

    let selectedRegs = Array.from(checkboxes).map(checkbox => {
      let row = checkbox.closest("tr");
      return row.dataset.reg;
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
