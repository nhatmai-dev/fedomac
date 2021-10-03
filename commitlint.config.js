module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'minor',
        'major',
      ],
    ],
    'scope-enum': [2, 'always', ['root', 'ui', 'api', 'db', 'core']],
    'scope-empty': [1, 'never'],
    'references-empty': [2, 'never'],
    'subject-case': [0, 'never'],
  },
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['Fedomac-'],
    },
  },
}
