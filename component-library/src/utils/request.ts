import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import formatDate from './formatDate'

const service: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 60000,
})

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
	if(error.response) {
		console.error('请求错误', error);
		if(error.response.status === 403) {
			console.log('403禁止访问');
		}
	}
	return Promise.reject(error)
}

interface IcommonParams {
    version: string;
    charset: string;
    req_source: string;
    system: string;
    requestSerial?: string;
    timestamp?: string | Date | number;
    token?: string;
}

const commonParams: IcommonParams = { version: '1.0', charset: 'UTF-8', req_source: 'STP_ENTERPRISE', system: 'STP' }
service.interceptors.request.use((config: AxiosRequestConfig) => {
	// 深拷贝数据，令对象不被改变
	const commonParam = {...commonParams}
	// requestSerial 请求序列号
	let requestSerial: string = new Date().getTime().toString()
	for (let i = 0; i < 6; i++) {
		requestSerial += Math.floor(Math.random() * 10)
	}
	commonParam.requestSerial = requestSerial
	// timestamp 请求时间
	const timestamp: string | Date | number = formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss')
	commonParam.timestamp = timestamp

	commonParam.token = sessionStorage.getItem('token') || ''
	config.data = { ...config.data, ...commonParam }
    return config
}, errorHandler)

service.interceptors.response.use((response: AxiosResponse) => {
	// response.status === 200
    if (response.data.result_code === '0') {
        return response
    } else {
        return Promise.reject(new Error(response.data.err_msg))
    }
}, errorHandler)

export default service
