const isDev = process.env.NODE_ENV === 'development';

/**
 * Development-only logger utility
 * - Logs only appear in development mode
 * - Errors always logged (production safety)
 * - Prevents console pollution in production builds
 */
export const logger = {
  /**
   * Log debug information (development only)
   */
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args);
    }
  },

  /**
   * Log errors (always logged, even in production)
   */
  error: (...args: any[]) => {
    console.error(...args);
  },

  /**
   * Log warnings (development only)
   */
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  /**
   * Log info (development only)
   */
  info: (...args: any[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
};
