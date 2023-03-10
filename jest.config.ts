import { Config } from 'jest';

const config: Config = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': [
      'esbuild-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transformIgnorePatterns: [],
};
export default config;
