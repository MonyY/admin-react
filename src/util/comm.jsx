class MUtil {
	request(params) {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: params.type || 'get',
				url: params.url || '',
				dataType: params.dataType || 'json',
				headers: params.headers || {},
				data: params.data || null,
				success: res => {
					if (res.status === 0) {
						// 成功
						typeof resolve === 'function' && resolve(res.data, res.msg);
					} else if (res.status === 10) {
						// 未登录
						this.goLogin();
					} else {
						// 失败
						typeof reject === 'function' && reject(res.msg || res.data);
					}
				},
				error: err => {
					typeof reject === 'function' && reject(err.statusText);
				}
			});
		});
	}

	goLogin() {
		window.location.href = `/login?redirect=${encodeURIComponent(
			location.pathname
		)}`;
	}

	// 获取url参数
	getUrlParam(name) {
		const queryString = location.search.split('?')[1] || '',
			reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
			result = queryString.match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}

	// 请求失败提示
	errTips(msg = '好像哪里不对了~') {
		console.log(msg);
	}

	successTips(msg = '操作成功') {
		console.log(msg);
	}

	// 存localStorage
	setStorage(name, data) {
		let dataType = typeof data;
		if (dataType === 'object') {
			localStorage.setItem(name, JSON.stringify(data));
		} else if (['number', 'string', 'boolean'].includes(dataType)) {
			// 基础类型
			localStorage.setItem(name, data);
		} else {
			alert('该类型不能用于本地存储');
		}
	}

	// 取localStorage
	getStorage(name) {
		let data = localStorage.getItem(name);
		if (data) {
			return JSON.parse(data);
		} else {
			return '';
		}
	}

	// 删除localStorage
	removeStorage(name) {
		localStorage.removeItem(name);
	}
}

export default MUtil;
