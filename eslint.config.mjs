export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
            globals: {
                // Browser globals
                console: 'readonly',
                process: 'readonly',
                // ES2021 globals
                globalThis: 'readonly',
                Promise: 'readonly',
                // Node.js globals
                __dirname: 'readonly',
                __filename: 'readonly',
                Buffer: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
            },
        },
        rules: {
            // Add your custom rules here
        },
    },
];
