// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import queryPlugin from '@tanstack/eslint-plugin-query';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitestPlugin from '@vitest/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import addDataCid from './eslint-rules/add-data-cid.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
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
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin,
      '@tanstack/query': queryPlugin,
      import: importPlugin,
      'lost-no-more-eslint': {
        rules: { 'add-data-cid': addDataCid },
      },
    },
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
    settings: {
      'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
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

      // react-query 규칙
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/stable-query-client': 'error',
      '@tanstack/query/infinite-query-property-order': 'warn',

      // Import/Export 관련 규칙
      'import/no-duplicates': 'error',
      // 'import/no-restricted-paths': [
      //   'error',
      //   {
      //     zones: [
      //       // 각 도메인은 자기 도메인 내부에서만 import 가능
      //       ...fs.readdirSync('src/domain').map((domain) => ({
      //         target: `src/domain/${domain}/**/*`,
      //         from: `src/domain/!(${domain})/**/*`,
      //         message: `${domain}는 자신 도메인의 내부에서만 import 가능합니다.`,
      //       })),
      //       {
      //         target: 'src/domain/**/*',
      //         from: 'src/!(shared|domain)/**/*',
      //         message: 'domain는 shared 이외의 레이어를 import하는 것을 금지합니다.',
      //       },
      //       // shared는 shared 내부에서만 import 가능
      //       {
      //         target: 'src/shared/**/*',
      //         from: 'src/!(shared)/**/*',
      //         message: 'shared는 shared 이외의 레이어를 import하는 것을 금지합니다.',
      //       },
      //       // _containers는 domain과 shared만 import 가능
      //       {
      //         target: 'src/app/**/_containers/**/*',
      //         from: 'src/!(domain|shared)/**/*',
      //         message: 'containers는 domain, shared 이외의 레이어를 import하는 것을 금지합니다.',
      //       },
      //     ],
      //   },
      // ],

      // 코드 품질 규칙
      'max-depth': ['error', 3],
      'max-params': ['error', 3],
      'max-lines-per-function': ['error', 250],
      'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
      'prefer-const': 'error',

      // data-cid 룰
      'lost-no-more-eslint/add-data-cid': 'error',
    },
  },
  // 테스트 코드 eslint 룰
  {
    files: ['**/*.test.{ts,tsx}', 'src/vitest/**/*.{ts,tsx}'],
    plugins: { vitest: vitestPlugin, 'testing-library': testingLibraryPlugin },
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
