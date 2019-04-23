import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx';
import MUtil from 'util/comm.jsx';
import Product from 'service/product-service.jsx';

import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class UserList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			pageNum: 1,
			listType: 'list'
		};
	}

	componentDidMount() {
		this.loadProductList();
	}

	// 获取商品列表
	loadProductList() {
		let param = {};
		param.listType = this.state.listType;
		param.pageNum = this.state.pageNum;

		if (this.state.listType === 'search') {
			param.searchType = this.state.searchType;
			param.searchKeyword = this.state.searchKeyword;
		}

		_product.getProductList(param).then(
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
				this.loadProductList();
			}
		);
	}

	// 上/下架
	setProductStatus(e, id, status) {
		let newStatus = status === 1 ? 2 : 1;
		let confirmTips =
			status === 1 ? '确定要下架商品吗？' : '确定要上架商品吗？';
		if (confirm(confirmTips)) {
			_product
				.setProductStatus({
					productId: id,
					status: newStatus
				})
				.then(
					res => {
						_mm.successTips(res);
						this.loadProductList();
					},
					err => {
						_mm.errTips(err);
					}
				);
		}
	}

	// 查询
	searchList(data) {
		let listType = data.searchKeyword === '' ? 'list' : 'search';
		this.setState(
			{
				listType,
				pageNum: 1,
				searchType: data.searchType,
				searchKeyword: data.searchKeyword
			},
			() => {
				this.loadProductList();
			}
		);
	}

	render() {
		let tableHeads = [
			{
				name: '商品ID',
				width: '10%'
			},
			{
				name: '商品信息',
				width: '50%'
			},
			{
				name: '价格',
				width: '10%'
			},
			{
				name: '状态',
				width: '10%'
			},
			{
				name: '操作',
				width: '20%'
			}
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="商品列表">
					<div className="page-head-right">
						<Link className="btn btn-primary" to="/product/save">
							<i className="fa fa-plus" />
							<span>添加商品</span>
						</Link>
					</div>
				</PageTitle>
				<ListSearch
					search={e => {
						this.searchList(e);
					}}
				/>
				<TableList tableHeads={tableHeads}>
					{this.state.list.map((item, index) => {
						return (
							<tr key={index}>
								<td>{item.id}</td>
								<td>
									<p>{item.name}</p>
									<p>{item.subtitle}</p>
								</td>
								<td>¥{item.price}</td>
								<td>
									<p>{item.status === 1 ? '在售' : '已下架'}</p>
									<button
										className="btn btn-xs btn-warning"
										onClick={e => {
											this.setProductStatus(e, item.id, item.status);
										}}
									>
										{item.status === 1 ? '下架' : '上架'}
									</button>
								</td>
								<td>
									<Link className="opear" to={`/product/detail/${item.id}`}>
										详情
									</Link>
									<Link className="opear" to={`/product/save/${item.id}`}>
										编辑
									</Link>
								</td>
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
