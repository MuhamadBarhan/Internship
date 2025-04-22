import { helper } from '@ember/component/helper';

export default helper(function joinArray([array, separator = ", "]) {
    return Array.isArray(array) ? array.join(separator) : "No skills added";
});

