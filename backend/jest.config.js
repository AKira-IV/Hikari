module.exports = {
  displayName: 'Hikari Backend Tests',
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Performance optimizations
  maxWorkers: '50%', // Use half of CPU cores
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  clearMocks: true,

  // File patterns
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: [
    '**/__tests__/**/*.(t|j)s',
    '**/*.(test|spec).(t|j)s',
  ],

  // Transformations
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        isolatedModules: true, // Faster compilation
        useESM: false,
      },
    ],
  },

  // Module resolution
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],

  // Coverage settings (optimized)
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/**/*.spec.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.dto.ts',
    '!src/main.ts',
    '!src/database/seed.ts',
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['text-summary', 'lcov'],

  // Test setup
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  // Timeouts
  testTimeout: 10000, // Reduced from default 30s

  // Performance monitoring
  verbose: false, // Disable detailed output for speed
  silent: false,

  // Parallelization settings
  // runInBand: false, // Allow parallel execution (default)

  // Memory management
  logHeapUsage: false,
  detectOpenHandles: true,
  forceExit: true,
};
