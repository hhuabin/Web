import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/form',
	},
	{
		path: '/form',
		name: 'Form',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Form/Form.vue'),
	},
]

const router = createRouter({ 
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
