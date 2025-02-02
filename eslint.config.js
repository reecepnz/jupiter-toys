import globals from "globals";

export default {
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        globals: {
            ...globals.browser,
            ...globals.node
        }
    },
    rules: {
        "comma-dangle": ["error", "never"],
        "indent": ["error", 4],
        "keyword-spacing": ["error", { before: true, after: true }],
        "max-len": ["warn", { code: 160 }],
        "no-console": "off",
        "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
        "no-trailing-spaces": "error",
        "no-unused-vars": "warn",
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "space-before-blocks": ["error", "always"],
        "space-in-parens": ["error", "never"]
    }
};