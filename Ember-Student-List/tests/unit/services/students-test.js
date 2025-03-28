import { module, test } from 'qunit';
import { setupTest } from 'ember-student-list/tests/helpers';

module('Unit | Service | students', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:students');
    assert.ok(service);
  });
});
