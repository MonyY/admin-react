import React from 'react';
import MUtil from 'util/comm.jsx';
import Product from 'service/product-service.jsx';
import './category-selector.scss';

const _mm = new MUtil();
const _product = new Product();

// 品类选择器
class CategorySelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstCategoryList: [],
			firstCategoryId: 1,
			secondCategoryList: [],
			secondCategoryId: 0
		};
	}

	componentWillMount() {
		this.loadFirstCategory(this.state.firstCategoryId);
	}

	componentWillReceiveProps(nextProps) {
		let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
			parentCategoryId = this.props.parentCategoryId !== nextProps.parentCategoryId;
		// 如果数据没有变化
		if (!categoryIdChange && !parentCategoryId) {
			return;
		}
		if (nextProps.parentCategoryId === 0) {
			this.setState(
				{
					firstCategoryId: nextProps.categoryId,
					secondCategoryId: 0
				},
				() => {
					this.loadFirstCategory();
				}
			);
		} else {
			this.setState(
				{
					firstCategoryId: nextProps.parentCategoryId,
					secondCategoryId: nextProps.categoryId
				},
				() => {
					parentCategoryId && this.loadSecondCategory();
				}
			);
		}
	}

	// 加载一级分类
	loadFirstCategory() {
		_product.getCategoryList(this.state.firstCategoryId).then(
			res => {
				this.setState({
					firstCategoryList: res
				});
			},
			errMsg => {
				_mm.errTips(errMsg);
			}
		);
	}
	// 加载二级分类
	loadSecondCategory() {
		_product.getCategoryList(this.state.firstCategoryId).then(
			res => {
				this.setState({
					secondCategoryList: res
				});
			},
			errMsg => {
				_mm.errTips(errMsg);
			}
		);
	}

	// 选择一级分类
	onFirstCategoryChange(e) {
		let newVal = e.target.value;
		this.setState(
			{
				firstCategoryId: newVal,
				secondCategoryList: [],
				secondCategoryId: 0
			},
			() => {
				// 更新二级分类
				this.loadSecondCategory();
				this.onPropsCategoryChange();
			}
		);
	}

	// 选择二级分类
	onSecondCategoryChange(e) {
		let newVal = e.target.value;
		this.setState(
			{
				secondCategoryId: newVal
			},
			() => {
				// 更新二级分类
				this.onPropsCategoryChange();
			}
		);
	}

	// 传给父组件选中结果
	onPropsCategoryChange() {
		// 判断props中是否有回调函数
		let flag = typeof this.props.onCategoryChange === 'function';
		// 如果选择了二级分类
		if (this.state.secondCategoryId) {
			flag && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
		} else {
			// 只选择了一级分类
			flag && this.props.onCategoryChange(this.state.firstCategoryId, 0);
		}
	}

	render() {
		return (
			<div className="col-md-10">
				<select
					value={this.state.firstCategoryId}
					onChange={e => {
						this.onFirstCategoryChange(e);
					}}
					className="form-control cate-selector"
				>
					<option value="">请选择一级分类</option>
					{this.state.firstCategoryList.map(item => {
						return (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						);
					})}
				</select>
				{this.state.secondCategoryList.length ? (
					<select
						value={this.state.secondCategoryId}
						onChange={e => {
							this.onSecondCategoryChange(e);
						}}
						className="form-control cate-selector"
					>
						<option value="">请选择二级分类</option>
						{this.state.secondCategoryList.map(item => {
							return (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							);
						})}
					</select>
				) : null}
			</div>
		);
	}
}

export default CategorySelector;
