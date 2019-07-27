import request from 'services/request'

// 商店查询
export function shopListService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/shop/query',
		method: 'post',
		data
	})
}

// 仓库查询
export function myListService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/ware/query',
		method: 'post',
		data
	})
}

// 建新建筑
export function buildService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/square/build',
		method: 'post',
		data
	})
}

// 拆除建筑
export function removeService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/square/remove',
		method: 'post',
		data
	})
}

// 查询当前建筑情况
export function buildListService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/square/query',
		method: 'post',
		data
	})
}

// 购买接口
export function buyService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/shop/buy',
		method: 'post',
		data
	})
}