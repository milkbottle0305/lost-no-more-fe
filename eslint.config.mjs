// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import addDataCid from './eslint-rules/add-data-cid.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:testing-library/react'
  ),
  {
    ignores: [
      'node_modules/**/*',
      '.next/**/*',
      'dist/**/*',
      'build/**/*',
      'public/**/*',
      'eslint-rules/**/*',
      'out/**/*',
      'next.config.ts',
      'vitest.setup.ts',
      'vitest.config.ts',
      'postcss.config.mjs',
      'tailwind.config.ts',
      'eslint.config.mjs',
    ],
  },
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // TypeScript 관련 규칙
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['typeAlias'],
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // React 관련 규칙
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react/self-closing-comp': 'error',
      'react/no-array-index-key': 'warn',

      // Import/Export 관련 규칙
      'import/no-default-export': 'warn',
      'import/no-duplicates': 'error',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: 'src/lib/**/*',
              from: 'src/components/**/*',
              message: 'lib 폴더에서 components를 참조할 수 없습니다.',
            },
            {
              target: 'src/utils/**/*',
              from: 'src/components/**/*',
              message: 'utils 폴더에서 components를 참조할 수 없습니다.',
            },
          ],
        },
      ],

      // 코드 품질 규칙
      'max-depth': ['error', 3],
      'max-params': ['error', 3],
      'max-lines-per-function': ['error', 250],
      'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
      'prefer-const': 'error',
    },
  },
  // data-cid 규칙
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'lost-no-more-eslint': {
        rules: { 'add-data-cid': addDataCid },
      },
    },
    rules: {
      'lost-no-more-eslint/add-data-cid': 'error',
    },
  },
  // 테스트 코드 eslint 룰
  {
    files: ['**/*.test.{ts,tsx}', 'src/vitest/**/*.{ts,tsx}'],
    plugins: ['vitest'],
    rules: {
      'max-lines-per-function': 'off',
      'no-console': 'off',
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/prefer-each': 'error',
      'vitest/prefer-spy-on': 'error',
      'testing-library/prefer-user-event': 'warn',
    },
  },
];

export default eslintConfig;
