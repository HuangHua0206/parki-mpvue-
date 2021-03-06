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

// 收集能量球
export function collectBallsService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/square/reward',
		method: 'post',
		data
	})
}

// 好友列表接口
export function friendListService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/friends',
		method: 'post',
		data
	})
}

// 赠送能量
export function giveEnergyService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/gift',
		method: 'post',
		data
	})
}

// 狩猎前调接口
export function beforeHuntingService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/attack',
		method: 'post',
		data
	})
}

// 狩猎完成
export function finishHuntingService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/monster/reward',
		method: 'post',
		data
	})
}

// 狩猎完成
export function huntingRecordService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/huntrecord/query',
		method: 'post',
		data
	})
}


// 分享
export function shareService(data) {
	return request({
		testUrl: '/static/json/list.json',
		url: '/parki/share',
		method: 'post',
		data
	})
}