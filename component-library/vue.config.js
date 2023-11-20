const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: './',
	// 禁用eslint
	// lintOnSave: process.env.NODE_ENV !== 'production',
})
