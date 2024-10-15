import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {rules: {"no-unused-vars": "warn"}},
  {extends: "prettier"},
];