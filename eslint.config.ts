import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript';
// configureVueProject({ scriptLangs: ['ts', 'tsx'] });
// More info at <url id="cv6ldbscoua3vcuono60" type="url" status="parsed" title="GitHub - vuejs/eslint-config-typescript: ESLint configuration for Vue 3 + TypeScript projects" wc="6497">https://github.com/vuejs/eslint-config-typescript/#advanced-setup</url>

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    rules: {
      // 禁用组件名称应该是多单词的规则
      'vue/component-name-in-template': 'off',
    },
  }
);
