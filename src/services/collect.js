import request from 'services/request'

export function collectService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/collect',
		method: 'post',
		data
	})
}