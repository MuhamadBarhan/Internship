import { helper } from '@ember/component/helper';
import { capitalize as emberCapitalize } from '@ember/string';

export default helper(function capitalize([value]) {
  return emberCapitalize(value);
});
