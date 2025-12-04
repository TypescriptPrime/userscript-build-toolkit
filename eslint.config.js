import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

const config = [
  {
    files: ["sources/**/*.ts", "tests/**/*.test.ts"], // Target TypeScript files
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "semi": ["error", "never"],
      "quotes": ["error", "single"],  
      "@typescript-eslint/no-unused-vars": "warn",
      '@typescript-eslint/naming-convention': ['error', {
			selector: ['variableLike', 'parameterProperty', 'classProperty', 'typeProperty'],
			format: ['PascalCase']
		  }]
    }
  }
]

export default config