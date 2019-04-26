import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUpload from 'util/file-upload/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import Product from 'service/product-service.jsx';

const _product = new Product();
import './save.scss';

class ProductSave extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			name: '',
			subtitle: '',
			categoryId: 0,
			parentCategoryId: 0,
			subImages: [],
			price: '',
			stock: '',
			detail: '',
			status: 1 // 商品状态1 -> 在售
		};
	}

	componentDidMount() {
		this.loadProduct();
	}

	loadProduct() {
		// 有id时为编辑
		if (this.state.id) {
			_product.getProduct(this.state.id).then(
				res => {
					if (res.subImages !== null) {
						let images = res.subImages.split(',');
						res.subImages = images.map(item => {
							return {
								uri: item,
								url: res.imageHost + item
							};
						});
					} else {
						res.subImages = [];
					}
					res.defaultDetail = res.detail;
					this.setState(res);
				},
				err => {
					console.log(err);
				}
			);
		}
	}

	onValueChange(e) {
		let name = e.target.name,
			val = e.target.value.trim();
		this.setState({
			[name]: val
		});
	}

	// 获取所属分类Id
	onCategoryChange(categoryId, parentCategoryId) {
		this.setState({
			categoryId,
			parentCategoryId
		});
	}

	// 上传图片成功
	onUploadSuccess(res) {
		let subImages = this.state.subImages;
		subImages.push(res.data);
		this.setState({
			subImages
		});
	}

	// 上传图片失败
	onUploadError(err) {
		console.log(err.message || '上传图片失败');
	}

	// 删除图片
	deleImg(e) {
		let index = e.target.getAttribute('index'),
			subImages = this.state.subImages;
		subImages.splice(index, 1);
		this.setState({
			subImages
		});
	}

	// 获取编辑器内容
	onEditorChange(detail) {
		this.setState({
			detail
		});
	}

	getSubImages() {
		return this.state.subImages.map(item => item.uri).join(',');
	}

	// 提交
	onSubmit(e) {
		let product = {
			name: this.state.name,
			subtitle: this.state.subtitle,
			subImages: this.getSubImages(),
			price: +this.state.price,
			stock: +this.state.stock,
			status: this.state.status,
			categoryId: this.state.categoryId,
			detail: this.state.detail
		};
		if (this.state.id) {
			product.id = this.state.id;
		}
		_product.saveProduct(product).then(
			res => {
				this.props.history.push('/product/index');
			},
			err => {
				console.log(err);
			}
		);
	}

	render() {
		return (
			<div id="page-wrapper">
				<PageTitle title="添加商品" />
				<div className="form-horizontal">
					<div className="form-group">
						<label className="col-md-2 control-label">商品名称</label>
						<div className="col-md-5">
							<input
								type="text"
								value={this.state.name}
								className="form-control"
								placeholder="请输入商品名称"
								name="name"
								onChange={e => this.onValueChange(e)}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品描述</label>
						<div className="col-md-5">
							<input
								type="text"
								value={this.state.subtitle}
								className="form-control"
								placeholder="请输入商品描述"
								name="subtitle"
								onChange={e => this.onValueChange(e)}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">所属分类</label>
						<CategorySelector
							categoryId={this.state.categoryId}
							parentCategoryId={this.state.parentCategoryId}
							onCategoryChange={(categoryId, parentCategoryId) =>
								this.onCategoryChange(categoryId, parentCategoryId)
							}
						/>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品价格</label>
						<div className="col-md-3">
							<div className="input-group">
								<input
									type="number"
									value={this.state.price}
									className="form-control"
									placeholder="请输入商品价格"
									name="price"
									onChange={e => this.onValueChange(e)}
								/>
								<span className="input-group-addon">元</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品库存</label>
						<div className="col-md-3">
							<div className="input-group">
								<input
									type="number"
									value={this.state.stock}
									className="form-control"
									placeholder="请输入商品库存"
									name="stock"
									onChange={e => this.onValueChange(e)}
								/>
								<span className="input-group-addon">件</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品图片</label>
						<div className="col-md-10">
							{this.state.subImages.length ? (
								this.state.subImages.map((item, index) => (
									<div className="img-con" key={index}>
										<img src={item.url} alt="商品图片" />
										<i className="fa fa-times" index={index} onClick={e => this.deleImg(e)} />
									</div>
								))
							) : (
								<div>请上传图片</div>
							)}
						</div>
						<div className="col-md-offset-2 col-md-10">
							<FileUpload
								onSuccess={res => this.onUploadSuccess(res)}
								onError={err => this.onUploadError(err)}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品详情</label>
						<div className="col-md-10">
							<RichEditor
								detail={this.state.detail}
								defaultDetail={this.state.defaultDetail}
								onEditorChange={e => this.onEditorChange(e)}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-offset-2 col-md-10">
							<button type="submit" className="btn btn-primary" onClick={e => this.onSubmit(e)}>
								提交
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductSave;
