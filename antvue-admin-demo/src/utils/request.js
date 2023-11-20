import axios from 'axios'
import formatDate from './formatDate'
import { message } from 'ant-design-vue';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 60000
})

const commonParams = {  }
service.interceptors.request.use(config => {
	
	config.data = { ...config.data, ...commonParams }

    config['method'] = 'post'
    return config
}, err => {
    return Promise.reject(err)
})

service.interceptors.response.use(response => {
    if (response.data.result_code === '0' || !response.data.err_msg) {
        return response.data
    } else {
        message.error(response.data.err_msg)
        return Promise.reject(new Error(response.data.err_msg))
    }
}, err => {
    return Promise.reject(err)
})

export default service