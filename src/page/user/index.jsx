import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import User from 'service/user-service.jsx';
import MUtil from 'util/comm.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			pageNum: 1,
			firstLoading: true
		};
	}

	componentDidMount() {
		this.loadUserList();
	}

	loadUserList() {
		_user
			.getList({
				pageSize: this.state.pageSize,
				pageNum: this.state.pageNum
			})
			.then(
				res => {
					this.setState(res, () => {
						this.setState({
							firstLoading: false
						});
					});
				},
				errMsg => {
					this.setState({
						list: [],
						firstLoading: false
					})
					_mm.errTips(errMsg);
				}
			);
	}

	// 页数变化
	onPageChange(page) {
		// 异步
		this.setState(
			{
				pageNum: page
			},
			() => {
				this.loadUserList();
			}
		);
	}

	render() {
		let listBody = this.state.list.map((item, index) => {
			return (
				<tr key={index}>
					<td>{item.id}</td>
					<td>{item.username}</td>
					<td>{item.email}</td>
					<td>{item.phone}</td>
					<td>{new Date(item.createTime).toLocaleString()}</td>
				</tr>
			);
		});

		let errList = (
			<tr>
				<td colSpan="5" style={{ textAlign: 'center' }}>
					{this.state.firstLoading ? '正在加载数据...' : '没有数据...'}
				</td>
			</tr>
		);

		return (
			<div id="page-wrapper">
				<PageTitle title="用户列表" />
				<div className="row">
					<div className="col-md-12">
						<table className="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>ID</th>
									<th>用户名</th>
									<th>邮箱</th>
									<th>电话</th>
									<th>注册时间</th>
								</tr>
							</thead>
							<tbody>{this.state.list.length === 0 ? errList : listBody}</tbody>
						</table>
					</div>
				</div>
				<Pagination
					current={this.state.pageNum}
					total={this.state.total}
					onChange={page => this.onPageChange(page)}
				/>
			</div>
		);
	}
}

export default UserList;
