/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let seen = {};
  transactions.forEach((e) => {
    if (seen[e.category]) {
      seen[e.category] += e.price;
    } else {
      seen[e.category] = e.price;
    }
  });
  let result = [];
  for (let cat in seen) {
    result.push({ category: cat, totalSpent: seen[cat] });
  }
  return result;
}

module.exports = calculateTotalSpentByCategory;
