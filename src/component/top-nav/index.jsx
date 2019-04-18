import React from 'react';
import { Link } from 'react-router-dom';
import User from 'service/user-service.jsx';
import MUtil from 'util/comm.jsx';

const _mm = new MUtil();
const _user = new User();

class TopNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: _mm.getStorage('userInfo').username || ''
		};
	}

	onLogout() {
		_user.logout().then(
			res => {
				_mm.removeStorage('userInfo');
				location.assign('/login');
			},
			errMsg => {
				_mm.errTips(errMsg);
			}
		);
	}

	render() {
		return (
			<div className="navbar navbar-default top-navbar">
				<div className="navbar-header">
					<Link className="navbar-brand" to="/">
						<b>HAPPY</b>MALL
					</Link>
				</div>
				<ul className="nav navbar-top-links navbar-right">
					<li className="dropdown">
						<a className="dropdown-toggle" href="javascript:;">
							<i className="fa fa-user fa-fw" />
							{this.state.username ? (
								<span>欢迎, {this.state.username}</span>
							) : (
								<span>欢迎您</span>
							)}
							<i className="fa fa-caret-down" />
						</a>
						<ul className="dropdown-menu dropdown-user">
							<li>
								<a
									onClick={() => {
										this.onLogout();
									}}
								>
									<i className="fa fa-sign-out-alt fa-fw" />
									<span>退出登陆</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}

export default TopNav;
