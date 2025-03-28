import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-student-list/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | student-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<StudentForm />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <StudentForm>
        template block text
      </StudentForm>
    `);

    assert.dom().hasText('template block text');
  });
});
