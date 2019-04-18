import MUtil from 'util/comm.jsx';

const _mm = new MUtil();

class User {
	// 用户登录
	login(loginInfo) {
		let result = this.checLoginInfo(loginInfo);
		if (result.status) {
			return _mm.request({
				type: 'post',
				url: '/manage/user/login.do',
				data: loginInfo
			});
		} else {
			_mm.errTips(result.msg);
		}
	}

	// 登录验证
	checLoginInfo(loginInfo) {
		let username = $.trim(loginInfo.username),
			password = $.trim(loginInfo.password);
		if (typeof username !== 'string' || username.length === 0) {
			return {
				status: false,
				msg: '用户名不能为空!'
			};
		} else if (typeof password !== 'string' || password.length === 0) {
			return {
				status: false,
				msg: '密码不能为空!'
			};
		} else {
			return {
				status: true,
				msg: '验证通过!'
			};
		}
	}

	// 退出登录
	logout() {
		return _mm.request({
			type: 'post',
			url: '/user/logout.do'
		});
	}

	// 获取用户列表
	getList(data) {
		return _mm.request({
			type: 'post',
			url: '/manage/user/list.do',
			data
		});
	}
}

export default User;
