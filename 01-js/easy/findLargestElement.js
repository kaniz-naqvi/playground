/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  let maxNum = -Infinity;
  for (let num of numbers) {
    if (maxNum < num) {
      maxNum = num;
    }
  }
  return maxNum;
}

module.exports = findLargestElement;
