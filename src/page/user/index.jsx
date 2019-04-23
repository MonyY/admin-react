import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import User from 'service/user-service.jsx';
import MUtil from 'util/comm.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			pageNum: 1
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
					this.setState(res);
				},
				errMsg => {
					this.setState({
						list: []
					});
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
		let tableHeads = [
			{
				name: '用户ID',
				width: '10%'
			},
			{
				name: '用户名',
				width: '30%'
			},
			{
				name: '邮箱',
				width: '15%'
			},
			{
				name: '电话',
				width: '15%'
			},
			{
				name: '注册时间',
				width: '20%'
			}
		];

		return (
			<div id="page-wrapper">
				<PageTitle title="用户列表" />
				<TableList tableHeads={tableHeads}>
					{this.state.list.map(item => {
						return (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.username}</td>
								<td>{item.email}</td>
								<td>{item.phone}</td>
								<td>{new Date(item.updateTime).toLocaleString()}</td>
							</tr>
						);
					})}
				</TableList>
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
