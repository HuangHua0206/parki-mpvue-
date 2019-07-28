import request from 'services/request'
// 收集能量，背包添加&扣减能量
export function collectService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/collect',
		method: 'post',
		data
	})
}
// 当前收集情况列表
export function getCollectService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/collect/query',
		method: 'post',
		data
	})
}
// 宠物列表
export function animalListService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/pets/query',
		method: 'post',
		data
	})
}

// 背包列表
export function bagsListService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/yield/query',
		method: 'post',
		data
	})
}

// 绑定手环
export function bindBraceletService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/yield/query',
		method: 'post',
		data
	})
}
