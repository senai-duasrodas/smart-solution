module.exports = {
    extends: 'airbnb-base',
    rules: {
        'no-underscore-dangle': ['error', { 'allowAfterThis': true, 'enforceInMethodNames': false }],
        'import/no-unresolved': [2, { caseSensitive: true, commonjs: true }],
        'arrow-parens': [2, 'as-needed'],
        'no-trailing-spaces': ['error', { 'skipBlankLines': true, 'ignoreComments': true }],
        'no-confusing-arrow': ['error', { 'allowParens': true }],
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        'no-plusplus': 'off',
        'radix': [2, 'as-needed'],
        'no-eval': 'off',
        'no-new': 'off',
        'prefer-promise-reject-errors': 'off',
        'nonblock-statement-body-position': ['error', 'beside', { 'overrides': { 'if': 'any' } }],
        curly: ['error', 'multi-or-nest', 'consistent'],
        'no-restricted-syntax': 'off',
        'no-throw-literal': 'off',
        'no-continue': 'off',
        'no-use-before-define': 'off',
        'no-await-in-loop': 'off',
        'no-useless-catch': 'off'
    },
    settings: {
        'import/resolver': 'node',
    },
    env: {
        "mocha": true,
    },
};