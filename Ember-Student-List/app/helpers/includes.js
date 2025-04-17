import { helper } from '@ember/component/helper';

export default helper(function includes([array, value]) {
  return Array.isArray(array) && array.includes(value);  // Safe check if array is valid
});

