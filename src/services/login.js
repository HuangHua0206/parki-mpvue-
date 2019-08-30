import request from 'services/request'

export function loginService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/login',
		method: 'post',
		data
	})
}