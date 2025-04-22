module.exports = {
  testEnvironment: "node", // Set test environment, you can also use jsdom for browser tests
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testMatch: ["**/test/**/*.test.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
