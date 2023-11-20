// 路由守卫
import { message } from 'ant-design-vue';

/**
 * 检查是否登录函数
 * @returns boolen
 */
const isAuthenticated = () => {
	const token = sessionStorage.getItem('token') || ''
	const enterpriseId = sessionStorage.getItem('enterpriseId') || ''
	if(token && enterpriseId) {
		return true
	}
	return false
}
 
/**
 * 登录守卫
 * @param {*} to 
 * @param {*} from 
 * @param {*} next 
 */
export const loginGuard = (to, from, next) => {
	if(
		// 检查用户是否已登录
		!isAuthenticated() &&
		// 避免无限重定向
		to.name !== 'login'
	) {
		next({ path: '/login' })
		if(from.path !== '/') {
			message.warning('登录已失效，请重新登录')
		}
	} else {
		next()
	}
}
