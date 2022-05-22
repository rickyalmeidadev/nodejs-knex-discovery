module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/source/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
