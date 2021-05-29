module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
	'src/**/*.{js,ts}',
	'!src/**/*.{spec,test,fixture}.ts',
	'!**/node_modules/**'
  ],
};
