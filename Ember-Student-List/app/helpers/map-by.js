import { helper } from '@ember/component/helper';

export function mapBy([property, array]) {
  if (!array || !Array.isArray(array)) {
    return [];
  }
  return array.map(item => item[property]);
}

export default helper(mapBy);