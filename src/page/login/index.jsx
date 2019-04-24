import React, { Component } from 'react';
import User from 'service/user-service.jsx';
import MUtil from 'util/comm.jsx';

import './index.scss';

const _mm = new MUtil();
const _user = new User();

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			redirect: _mm.getUrlParam('rediect') || ''
		};
	}

	componentWillMount() {
		document.title = `登录 - HAPPY MALL`;
	}

	render() {
		return (
			<div className="col-md-4 col-md-offset-4">
				<div className="panel panel-primary login-panel">
					<div className="panel-heading">欢迎登陆 - MMALL管理系统</div>
					<div className="panel-body">
						<div className="form-group">
							<input
								name="username"
								type="text"
								className="form-control"
								placeholder="请输入用户名"
								onChange={e => {
									this.onInputChange(e);
								}}
								onKeyUp={e => {
									this.onInputKeyUp(e);
								}}
							/>
						</div>
						<div className="form-group">
							<input
								name="password"
								type="password"
								className="form-control"
								placeholder="请输入密码"
								onChange={e => {
									this.onInputChange(e);
								}}
								onKeyUp={e => {
									this.onInputKeyUp(e);
								}}
							/>
						</div>
						<button
							className="btn btn-lg btn-block btn-primary"
							onClick={e => {
								this.onSubmit(e);
							}}
						>
							登录
						</button>
					</div>
				</div>
			</div>
		);
	}

	// 回车键
	onInputKeyUp(e) {
		if (e.keyCode === 13) {
			this.onSubmit();
		}
	}

	// Input改变
	onInputChange(e) {
		let inputName = e.target.name,
			inputValue = e.target.value;
		this.setState({
			[inputName]: inputValue
		});
	}

	// 用户提交
	onSubmit(e) {
		let loginInfo = {
			username: this.state.username,
			password: this.state.password
		};

		let result = _user.checLoginInfo(loginInfo);
		if (result.status) {
			_user.login(loginInfo).then(
				res => {
					_mm.setStorage('userInfo', res);
					// 从哪个页面跳到登录页，登录成功后再跳回去
					this.props.history.push(this.state.redirect);
				},
				err => {
					_mm.errTips(err);
				}
			);
		} else {
			_mm.errTips(result.msg);
		}
	}
}

export default Login;
