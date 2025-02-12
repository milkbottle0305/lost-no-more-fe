// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import addDataCid from './eslint-rules/add-data-cid.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['node_modules/*', '.next/*', 'dist/*'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    plugins: ['prettier', 'tailwindcss'],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'off',
    },
  }),
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
];

export default eslintConfig;
