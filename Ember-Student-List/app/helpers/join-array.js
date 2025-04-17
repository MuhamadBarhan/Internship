import { helper } from '@ember/component/helper';

export default helper(function joinArray([array, separator = ", "]) {
    return Array.isArray(array) ? array.join(separator) : "No skills added";
});


// export default includes(function includes([array, separator = ", "]) {
//     return Array.isArray(array) ? array.join(separator) : "No skills added";
// });
