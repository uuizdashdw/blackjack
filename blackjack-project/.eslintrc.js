module.exports = {
	extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWitdth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
	},
};
