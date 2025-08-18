import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Базовые рекомендованные правила для JavaScript
  js.configs.recommended,

  // Рекомендованные правила для TypeScript
  ...tseslint.configs.recommended,

  {
    // Настройки языка
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      }
    },

    // Файлы для обработки
    files: ['src/**/*.ts', 'src/**/*.js'],

    // Пользовательские правила
    rules: {
      // TypeScript правила
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'error',

      // Общие правила
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],

      // Стиль кода
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // Импорты
      'sort-imports': ['error', {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      }],
    }
  },

  // Игнорирование файлов
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js',
      'coverage/**',
      '.vscode/**',
      '*.log',
      '.env*',
      '.DS_Store',
      'Thumbs.db'
    ]
  }
);
