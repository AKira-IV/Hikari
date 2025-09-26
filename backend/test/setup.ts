// Test setup file
import { config } from 'dotenv';

// Load test environment variables
config({ path: '.env.test' });

// Global test timeout
jest.setTimeout(30000);

// Mock console methods in tests to reduce noise
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
