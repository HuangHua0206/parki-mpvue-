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
		url: '/parki/wristband/bind',
		method: 'post',
		data
	})
}

// 收集超级能量
export function superCollectService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/super/collect',
		method: 'post',
		data
	})
}

// 查询当前websocket状态
export function websocketStatusService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/event/query',
		method: 'post',
		data
	})
}

// 查询当前手环绑定状态
export function bandStatusService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/band/query',
		method: 'post',
		data
	})
}

// 更换宠物
export function changeAnimalService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/pet/change',
		method: 'post',
		data
	})
}

// 查询当前积分
export function myIntegralService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/integral/query',
		method: 'post',
		data
	})
}