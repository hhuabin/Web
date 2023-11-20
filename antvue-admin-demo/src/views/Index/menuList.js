const menuList = [
	{
		title: '首页',        // 菜单标题名称
		key: '/home',         // 对应的path
	},
	{
		title: '员工福利发放',
		key: '/sub1',
		children: [            // 子菜单列表
			{
				title: '日常补贴发放',
				key: '/home/welfare',
			}
		]
	},
	{
		title: '统计查询',
		key: '/sub2',
		children: [
			{
				title: '交易分析',
				key: '/home/analysis',
			},
			{
				title: '统计报表',
				key: '/home/statistics',
			},
		]
	},
	{
		title: '企业管理',
		key: '/manage',
		children: [
			{
				title: '组织架构管理',
				key: '/home/frameman',
			},
			{
				title: '岗位管理',
				key: '/home/postman',
			},
			{
				title: '员工类型管理',
				key: '/home/typeman',
			},
			{
				title: '员工管理',
				key: '/home/staffman',
			},
		]
	}
]

export default menuList