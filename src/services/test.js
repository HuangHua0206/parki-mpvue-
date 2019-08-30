import request from 'services/request'

export function testService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '',
		method: 'get',
		data
	})
}