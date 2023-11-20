import { createRouter, createWebHashHistory } from 'vue-router'
import { loginGuard } from '@/router/guards'
import Index from '@/views/Index/Index.vue'

const routes = [
	{
		path: '/',
		name: 'index',
		component: Index,
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue')
			},
			{
				path: '/welfare',
				name: 'welfare',
				component: () => import(/* webpackChunkName: "welfare" */ '@/views/RouteView/RouteView.vue'),
				redirect: '/welfare/dailygrant',
				children: [
					{
						path: '/welfare/dailygrant',
						name: 'dailygrant',
						component: () => import(/* webpackChunkName: "welfare" */ '@/views/Welfare/DailyGrant/DailyGrant.vue')
					},
					{
						path: '/welfare/editgrant',
						name: 'editgrant',
						component: () => import(/* webpackChunkName: "welfare" */ '@/views/Welfare/DailyGrant/EditGrant.vue')
					},
					{
						path: '/welfare/newgrant',
						name: 'newgrant',
						component: () => import(/* webpackChunkName: "welfare" */ '@/views/Welfare/DailyGrant/NewGrant.vue')
					},
				]
			},
			{
				path: '/statistics',
				name: 'statistics',
				component: () => import(/* webpackChunkName: "statistics" */ '@/views/RouteView/RouteView.vue'),
				redirect: '/statistics/tradeanalysis',
				children: [
					{
						path: '/statistics/tradeanalysis',
						name: 'tradeanalysis',
						component: () => import(/* webpackChunkName: "statistics" */ '@/views/Statistics/TradeAnalysis/TradeAnalysis.vue')
					},
					{
						path: '/statistics/reportform',
						name: 'reportform',
						component: () => import(/* webpackChunkName: "reportform" */ '@/views/Statistics/ReportForm/ReportForm.vue')
					},
				]
			},
			{
				path: '/manage',
				name: 'manage',
				component: () => import(/* webpackChunkName: "manage" */ '@/views/RouteView/RouteView.vue'),
				redirect: '/manage/frameman',
				children: [
					{
						path: '/manage/frameman',
						name: 'frameman',
						component: () => import(/* webpackChunkName: "frameman" */ '@/views/RouteView/RouteView.vue'),
						redirect: '/manage/frameman/index',
						children: [
							{
								path: '/manage/frameman/index',
								name: 'framemanindex',
								component: () => import(/* webpackChunkName: "frameman" */ '@/views/Manage/Frameman/Frameman.vue')
							},
							{
								path: '/manage/frameman/newframe',
								name: 'newframe',
								component: () => import(/* webpackChunkName: "frameman" */ '@/views/Manage/Frameman/NewFrame.vue')
							},
							{
								path: '/manage/frameman/editframe',
								name: 'editframe',
								component: () => import(/* webpackChunkName: "frameman" */ '@/views/Manage/Frameman/EditFrame.vue')
							},
						],
					},
					{
						path: '/manage/postman',
						name: 'postman',
						component: () => import(/* webpackChunkName: "postman" */ '@/views/RouteView/RouteView.vue'),
						redirect: '/manage/postman/index',
						children: [
							{
								path: '/manage/postman/index',
								name: 'postmanindex',
								component: () => import(/* webpackChunkName: "postman" */ '@/views/Manage/Postman/Postman.vue')
							},
							{
								path: '/manage/postman/newpost',
								name: 'newpost',
								component: () => import(/* webpackChunkName: "postman" */ '@/views/Manage/Postman/NewPost.vue')
							},
							{
								path: '/manage/postman/editpost',
								name: 'editpost',
								component: () => import(/* webpackChunkName: "postman" */ '@/views/Manage/Postman/EditPost.vue')
							},
						],
					},
					{
						path: '/manage/stafftypeman',
						name: 'stafftypeman',
						component: () => import(/* webpackChunkName: "stafftypeman" */ '@/views/RouteView/RouteView.vue'),
						redirect: '/manage/stafftypeman/index',
						children: [
							{
								path: '/manage/stafftypeman/index',
								name: 'stafftypemanindex',
								component: () => import(/* webpackChunkName: "stafftypeman" */ '@/views/Manage/StaffTypeman/StaffTypeman.vue')
							},
							{
								path: '/manage/stafftypeman/newtype',
								name: 'newtype',
								component: () => import(/* webpackChunkName: "stafftypeman" */ '@/views/Manage/StaffTypeman/NewType.vue')
							},
							{
								path: '/manage/stafftypeman/edittype',
								name: 'edittype',
								component: () => import(/* webpackChunkName: "stafftypeman" */ '@/views/Manage/StaffTypeman/EditType.vue')
							},
						],
					},
					{
						path: '/manage/staffman',
						name: 'staffman',
						component: () => import(/* webpackChunkName: "staffman" */ '@/views/RouteView/RouteView.vue'),
						redirect: '/manage/staffman/index',
						children: [
							{
								path: '/manage/staffman/index',
								name: 'staffmanindex',
								component: () => import(/* webpackChunkName: "staffman" */ '@/views/Manage/Staffman/Staffman.vue')
							},
							{
								path: '/manage/staffman/newstaff',
								name: 'newstaff',
								component: () => import(/* webpackChunkName: "staffman" */ '@/views/Manage/Staffman/NewStaff.vue')
							},
							{
								path: '/manage/staffman/editstaff',
								name: 'editstaff',
								component: () => import(/* webpackChunkName: "staffman" */ '@/views/Manage/Staffman/EditStaff.vue')
							},
						],
					},
				]
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue')
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

// 登录路由守卫,自行开启
/* router.beforeEach((to, from, next) => {
	loginGuard(to, from, next);
}) */

export default router
