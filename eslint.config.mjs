import withNuxt from './.nuxt/eslint.config.mjs'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default withNuxt([
  ...pluginVue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    // Глобальные макросы Vue
    languageOptions: {
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        // другие Composition API при необходимости
      }
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      }
    }
  },
  {
    rules: {
      // Линтинг — в Biome; ESLint — форматтер (+ порядок блоков Vue)
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 1 },
        multiline: { max: 1 },
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below',
      }],

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  },
  {
    ignores: [
      '.nuxt/',
      '.output/',
      'node_modules/',
      'dist/',
      '*.config.*'
    ]
  }
])
