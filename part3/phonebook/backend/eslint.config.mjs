import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
    js.configs.recommended,
    {
        files: ["**/*.js"],
        plugins: {
            '@stylistic/js': stylistic,
        },
        languageOptions: {
            sourceType: "commonjs",
            globals: {...globals.node},
            ecmaVersion: 'latest',
        },
        rules:{
            'indent': ['error', 4],
            'arrow-spacing': ['error', { "before": true, "after": true }],
            'object-curly-spacing': ['error', "never"],
            'linebreak-style': ['error', 'unix'],
            
        }
    },
    {
        ignores: ["dist/**"]
    },

])