import cdkPlugin from 'eslint-cdk-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    // ...
    files: ['lib/**/*.ts', 'bin/*.ts'],
    // ✅ 一行追加するだけ
    extends: [cdkPlugin.configs.recommended],
  },
  {
    ignores: ['node_modules/', 'cdk.out/', '*.js'],
  }
);