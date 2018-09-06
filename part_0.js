// given an array of values, write a function that finds the index of where the
// value is located, and if nothing is found, returns -1. example: for ['apple',
// 'orange', 'pineapple'] 'orange' returns '1' 'durian' returns '-1'

function findIndex(myArr, element) {
  return console.log(myArr.indexOf(element));
}
findIndex(['apple', 'pear', 'orange', 'pineapple'], 'apple');
findIndex(['apple', 'orange', 'pineapple'], 'durian');

// now, write a function that finds all the indexes of where the value is
// located and returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple'] 'orange' returns [1,2]
function findAll(myArr, element) {
  if (myArr.indexOf(element) === -1) {
    return -1;
  }
  const result = [];
  myArr.forEach((el, index) => {
    if (el === element) {
      result.push(index);
    }
  });
  return result;
}
console.log(findAll(['apple', 'orange', 'pineapple', 'apple'], 'apple'));
