import Route from '@ember/routing/route';

export default class StudentsRoute extends Route {

    async model() {
      let response = await fetch('/students_data.json');
      let json = await response.json();
      return json; 
    }
    
}
