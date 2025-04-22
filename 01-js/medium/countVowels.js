/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let cleanStr = str.toLowerCase().replace(/\s+/g, " ").split("");
  let vowels = 0;
  for (let char of cleanStr) {
    if ("aeiou".includes(char)) {
      vowels++;
    }
  }
  return vowels;
}

module.exports = countVowels;
