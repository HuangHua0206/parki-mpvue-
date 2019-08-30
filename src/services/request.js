
var Fly = require("flyio/dist/npm/wx") 
var fly = new Fly
const NORMAL_BASE_URL = {
	local: 'https://rv.ksoapp.com',
	region: '',
	prod: ''
}

// fly.interceptors.response.use(
//     res => {
//         //只将请求结果的data字段返回
//         return response.data
//     },
//     err => {
//         //发生网络错误后会走到这里
//         //return Promise.resolve("ssss")
//     }
// )

export default function request(config) {
	 console.log(config)
	 // 本地mock情况下取testUrl字段 统一使用location.origin
    // if (process.env.NODE_ENV === 'development' && process.env.LOCAL_TEST) {
    //     config['method'] = 'get'
    //     config['url'] = process.env.LOCAL_TEST_URL + config['testUrl']
    // } else { // 非mock情况下（本地联调&线上） 部分请求origin不是同源account.wps.com
    //    if (config['baseUrl']) {
    //         config['url'] = config['baseUrl'] + config['url']
    //     } else {
    //     	config['url'] = process.env.NORMAL_BASE_URL + config['url']
    //     }
    // }
    config.url = NORMAL_BASE_URL.local + config.testUrl
	return fly.request(config.url, config.data, config)
}