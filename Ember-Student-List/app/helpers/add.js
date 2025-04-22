import { helper } from '@ember/component/helper';

export function add(params) {
  return params.reduce((sum, num) => sum + num, 0);
}

export default helper(add);