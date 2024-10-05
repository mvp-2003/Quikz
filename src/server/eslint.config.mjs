// eslint.config.mjs

export default {
    languageOptions: {
      globals: {
        process: 'readonly', // Declare 'process' as a global variable
        __dirname: 'readonly' // Declare '__dirname' as a global variable (optional)
      },
      parserOptions: {
        ecmaVersion: 12,    // Specify ECMAScript version
        sourceType: 'module' // Allow the use of imports
      }
    },
    rules: {
        'no-console': 'off',
        'semi': ['warn', 'always'], // Change 'error' to 'warn'
        'quotes': ['warn', 'single'], // Change 'error' to 'warn'
    },
  };
  