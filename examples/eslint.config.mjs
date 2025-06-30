import eslint from "@eslint/js";
import cdkPlugin from 'eslint-cdk-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['lib/**/*.ts', 'bin/*.ts'],
    extends: [cdkPlugin.configs.recommended],
  },
  {
    ignores: ['node_modules/', 'cdk.out/', '*.js'],
  }
);