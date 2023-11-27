// jest.config.js
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',
      },
    collectCoverage: true,
    collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
    "!**/jest.config.js"
    ],
    preset: "@shelf/jest-mongodb",
  };
  