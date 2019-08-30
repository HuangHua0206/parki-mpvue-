/**
 * 提示与加载工具类
 */
export default class Toast {
	static isLoading = false;
	static pause = false;

	/**
	 * 弹出提示框
	 */

	static success(title, duration = 1000) {
		wx.showToast({
			title: title,
			image: '/static/img/common/successT.png',
			mask: true,
			duration: duration
		})
		if (duration > 0) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, duration);
			});
		}
	}

	/**
	 * 弹出确认窗口
	 */
	static modal(text, title = '', confirmText = '确定') {
		return new Promise((resolve, reject) => {
			wx.showModal({
				title: title,
				content: text,
				confirmColor: "#3c8bee",
				showCancel: false,
				confirmText,
				success: res => {
					resolve(res)
				},
				fail: res => {
					reject(res);
				}
			})
		})
	}

	/**
	 * 弹出确认取消窗口
	 */
	static confirm({
									 title = '提示',
									 content,
									 confirmText = '确定',
									 confirmColor = "#3c8bee",
									 cancelText = "取消",
									 success,
									 fail
								 }) {
		wx.showModal({
			title,
			content,
			showCancel: true,
			confirmText,
			confirmColor,
			cancelText,
			success: (data) => {
				if (data.confirm) {
					success && success();
				} else {
					fail && fail();
				}
			}
		})
	}

	static toast(title, onHide, icon = 'none') {
		wx.showToast({
			title: title,
			icon: icon,
			mask: true,
			duration: 1000
		})
		// 隐藏结束回调
		if (onHide) {
			setTimeout(() => {
				onHide()
			}, 1000)
		}
	}

	/**
	 * 警告框
	 */
	static alert(title) {
		wx.showToast({
			title: title,
			image: '/static/img/common/failT.png',
			mask: true,
			duration: 1000
		});
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	}

	/**
	 * 错误框
	 */

	static error(title, onHide) {
		wx.showToast({
			title: title,
			image: '/static/img/common/failT.png',
			mask: true,
			duration: 1000
		});
		// 隐藏结束回调
		if (onHide) {
			setTimeout(() => {
				onHide()
			}, 1000)
		}
	}

	/**
	 * 弹出加载提示
	 */
	static loading(title = '加载中', force = false) {
		if (this.isLoading && !force) {
			return;
		}
		this.isLoading = true;
		if (wx.showLoading) {
			wx.showLoading({
				title: title,
				mask: true
			});
		} else {
			wx.showNavigationBarLoading();
		}
	}
	/**
	 * 弹出加载提示
	 */
	static topLoding() {
		wx.showNavigationBarLoading();
	}
	static topLoded() {
		wx.hideNavigationBarLoading();
	}
	/**
	 * 加载完毕
	 */
	static loaded() {

		if (this.isLoading) {
			this.isLoading = false;
			if (wx.hideLoading) {
				wx.hideLoading();
			} else {
				wx.hideNavigationBarLoading();
			}
		}
	}

	/**
	 * 弹出下拉动作栏
	 */
	static action(...items) {
		return new Promise((resolve, reject) => {
			wx.showActionSheet({
				itemList: items,
				success: function (res) {
					const result = {
						index: res.tapIndex,
						text: items[res.tapIndex]
					}
					resolve(result)
				},
				fail: function (res) {
					reject(res.errMsg)
				}
			})
		})
	}

	static actionWithFunc(items, ...functions) {
		wx.showActionSheet({
			itemList: items,
			success: function (res) {
				const index = res.tapIndex
				if (index >= 0 && index < functions.length) {
					functions[index]()
				}
			}
		})
	}

	static share(o) {
		return {
			title: o.title,
			path: o.url,
			img: o.imgUrl,
			success: function (res) {
				o.successCallback && o.successCallback();
				Tips.toast('分享成功')
			},
			fail: function (res) {
				o.failCallback && o.failCallback();
				Tips.toast('分享失败')
			},
			complete: function () {
				o.completeCallback && o.completeCallback();
			}
		}
	}

	static setLoading() {
		this.isLoading = true;
	}
}
