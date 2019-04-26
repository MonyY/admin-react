import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/comm.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			parentCategoryId: this.props.match.params.id || 0
		};
	}

	componentDidMount() {
		this.loadCategoryList();
	}

	componentDidUpdate(prevProps, prevState) {
		let oldPath = prevProps.location.pathname,
			newPath = this.props.location.pathname,
			newId = this.props.match.params.id || 0;

		if (oldPath !== newPath) {
			this.setState(
				{
					parentCategoryId: newId
				},
				() => {
					this.loadCategoryList();
				}
			);
		}
	}

	loadCategoryList() {
		_product.getCategoryList(this.state.parentCategoryId).then(
			res => {
				this.setState({
					list: res
				});
			},
			errMsg => {
				this.setState({
					list: []
				});
				_mm.errTips(errMsg);
			}
		);
	}

	// 更新品类名称
	onUpdateName(id, name) {
		let newName = prompt('请输入品类名称', name);
		if (newName) {
			_product
				.updateCategoryName({
					categoryId: id,
					categoryName: newName
				})
				.then(
					res => {
						console.log(res);
						this.loadCategoryList();
					},
					err => {
						console.log(err);
					}
				);
		}
	}

	render() {
		let tableHeads = [
			{
				name: '品类ID',
				width: '10%'
			},
			{
				name: '品类名称',
				width: '30%'
			},
			{
				name: '操作',
				width: '15%'
			}
		];

		return (
			<div id="page-wrapper">
				<PageTitle title="品类列表">
					<div className="page-head-right">
						<Link className="btn btn-primary" to="/product-category/add">
							<i className="fa fa-plus" />
							<span>添加品类</span>
						</Link>
					</div>
				</PageTitle>
				<div className="row">
					<div className="col-md-12">
						<p>父品类ID: {this.state.parentCategoryId}</p>
					</div>
				</div>
				<TableList tableHeads={tableHeads}>
					{this.state.list.map(category => {
						return (
							<tr key={category.id}>
								<td>{category.id}</td>
								<td>{category.name}</td>
								<td>
									<a className="opear" onClick={e => this.onUpdateName(category.id, category.name)}>
										修改名称
									</a>
									{category.parentId === 0 ? (
										<Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
									) : null}
								</td>
							</tr>
						);
					})}
				</TableList>
			</div>
		);
	}
}

export default CategoryList;
