import Tip from 'utils/tips'
var Fly = require("flyio/dist/npm/wx") 
var fly = new Fly
var crypto = require('crypto');

 
const NORMAL_BASE_URL = {
	local: 'https://rv.ksoapp.com',
	region: 'https://www.j4ckma.cn',
	prod: ''
}

// appname & appsecret
const APPKEY = {
    appname:"0xa0c942",
    appsecret:"c2e47ff02ce249bda8eb17e5789ff90b70222b73"
}

fly.interceptors.request.use(request => {
    // md5加密 和 sha1签名
    var MD5 = crypto.createHash('md5')
    var SHA1 = crypto.createHash('sha1')

    // ReqDate
    const reqDate = request.headers['ReqDate'] = (new Date()).toUTCString()
 
    // Content-Type
    request.headers['Content-Type'] = 'application/json'
 
    // Content-MD5
    const data = MD5.update(JSON.stringify(request.body))
    const md5 = data.digest('hex')
    const cmd5 = request.headers['Content-MD5'] = md5.toString()

    // AUTHORIZATION
    let hash = SHA1.update(APPKEY.appsecret)
    hash.update(cmd5)
    hash.update('application/json')
    hash.update(reqDate)
    const sig = hash.digest('hex').toString()
    request.headers['AUTHORIZATION'] = `API-1:${APPKEY.appname}:${ sig }`

    return request
})



fly.interceptors.response.use(
    res => {

        //只将请求结果的data字段返回
        // Tip.toast(JSON.stringify(response.data) + 'res')
        return res.data
    },
    err => {
        console.log(err, 'errerr')
       // return err.response
        // Tip.toast(JSON.stringify(err) + 'err')
        //发生网络错误后会走到这里
        return Promise.resolve(err.response.data)
    }
)

export default function request(config) {
    // config.headers['Content-Type'] = 'application/json'
    config.url = NORMAL_BASE_URL.region + config.url
	return fly.request(config.url, config.data, config)
}