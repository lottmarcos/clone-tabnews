import nextConfig from 'eslint-config-next/core-web-vitals';

import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint-define-config';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineConfig([
  ...nextConfig,
  {
    ignores: ['**/src/integrations/migrations/**', '**/coverage/**'],
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    languageOptions: {
      globals: {
        ...globals.jest,
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-undef': 'off',
    },
  },
  {
    plugins: {
      perfectionist: perfectionistPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'import/order': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-inline-comments': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
      'perfectionist/sort-exports': ['error', { ignoreCase: true }],
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: {
            type: {
              thirdParty: ['react', 'next'],
            },
            value: {
              thirdParty: [
                'react',
                'react-dom',
                'react-*',
                'next',
                'next/*',
                'next-*',
              ],
            },
          },
          groups: [
            'thirdParty',
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
            'unknown',
          ],
          ignoreCase: true,
          newlinesBetween: 'always',
          order: 'asc',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          bracketSameLine: false,
          bracketSpacing: true,
          jsxSingleQuote: false,
          printWidth: 80,
          quoteProps: 'as-needed',
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
        },
      ],
      semi: 'error',
      'prefer-const': 'error',
    },
  },
  prettierConfig,
]);
