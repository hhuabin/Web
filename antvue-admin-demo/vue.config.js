const Timestamp = new Date().getTime();

module.exports = {
	// 禁用eslint
	lintOnSave: process.env.NODE_ENV !== 'production',
	// lintOnSave: false,
	configureWebpack: {
		//每次打包后生成的js携带时间戳
		output: {
			// filename: `js/[name].${Timestamp}.js`,
			chunkFilename: `js/[name].${Timestamp}.js`,
		},
	},
	css: {
		loaderOptions: {
			less: {
				// 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
				// lessOptions: {
					/* modifyVars: {
						'primary-color': '#1DA57A',
						'link-color': '#1DA57A',
						'border-radius-base': '2px',
					}, */
					// 当设置 style: true 时，此句必须加
					javascriptEnabled: true,
				// }
			}
		}
	}
}
