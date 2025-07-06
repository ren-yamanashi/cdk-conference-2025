import eslint from "@eslint/js";
import cdkPlugin from "eslint-cdk-plugin";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    extends: [cdkPlugin.configs.recommended],
  },
]);

// import eslint from "@eslint/js";
// import cdkPlugin from "eslint-cdk-plugin";
// import { defineConfig } from "eslint/config";
// import tseslint from "typescript-eslint";

// export default defineConfig([
//   eslint.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     files: ["lib/**/*.ts", "bin/*.ts"],
//     languageOptions: {
//       parserOptions: {
//         projectService: true,
//         project: "./tsconfig.json",
//       },
//     },
//     // ✅ Add plugins
//     plugins: {
//       cdk: cdkPlugin,
//     },
//     // ✅ Add rules (use custom rules)
//     rules: {
//       "cdk/no-construct-in-interface": "error",
//       "cdk/no-construct-stack-suffix": "error",
//       "cdk/no-parent-name-construct-id-match": "error",
//     },
//   },
// ]);