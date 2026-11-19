/**
 * Unit tests for the glow prototype (src/glow_test).
 *
 * The main test config in vite.config.ts only runs Storybook stories in a browser.
 * These tests are plain functions (data in, data out), so they need no browser.
 *
 * Run with: npx vitest run --config vitest.glow.config.mjs
 */
export default {
  test: {
    globals: true,
    include: ["src/glow_test/**/*.test.ts"],
  },
};
