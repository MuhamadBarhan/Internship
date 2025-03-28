import EmberRouter from '@ember/routing/router';
import config from 'ember-student-list/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('students', function() {
    this.route('add');
    this.route('edit', {path: '/edit/:reg'});
  });
});
