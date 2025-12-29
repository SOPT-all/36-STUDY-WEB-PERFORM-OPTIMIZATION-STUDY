import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-var': 'error', // var 금지
      'prefer-const': 'error', // const 사용을 권장하고, let은 const로 바꿀 수 있으면 바꾸도록
      'prefer-template': 'warn', // 문자열 결합시 템플릿 리터럴 사용 강제
      'capitalized-comments': [
        'warn',
        'always',
        {
          ignoreConsecutiveComments: true,
          ignorePattern: '^[A-Z_]+$', // 대문자 스네이크 케이스 상수 이름 규칙 추가
        },
      ],
      // 함수명 네이밍 규칙
      camelcase: ['error', { properties: 'always' }], // 카멜 케이스 사용을 강제
      // 화살표 함수 사용을 권장하는 규칙
      'prefer-arrow-callback': 'warn', // 가능하면 화살표 함수 사용
      'arrow-body-style': ['warn', 'as-needed'], // 화살표 함수 본문을 간소화 필요없는 중괄호 제거
    },
  },
);
