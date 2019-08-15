import request from 'services/request'

// 商店查询
export function totalBloodService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/blood/query',
		method: 'get',
		data
	})
}