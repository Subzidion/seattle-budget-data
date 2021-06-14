module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!src/**/*.{spec,test,fixture}.ts",
    "!**/node_modules/**",
  ],
};
