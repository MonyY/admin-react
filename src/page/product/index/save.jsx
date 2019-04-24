import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUpload from 'util/file-upload/index.jsx';

import './save.scss';

class ProductSave extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryId: 0,
			parentCategoryId: 0,
			subImages: []
		};
	}

	// 获取所属分类Id
	onCategoryChange(categoryId, parentCategoryId) {
		console.log(categoryId);
		console.log(parentCategoryId);
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
		let index = e.target.index,
			subImages = this.state.subImages;
		subImages.splice(index, 1);
		this.setState({
			subImages
		});
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
								className="form-control"
								placeholder="请输入商品名称"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品描述</label>
						<div className="col-md-5">
							<input
								type="password"
								className="form-control"
								placeholder="请输入商品描述"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">所属分类</label>
						<CategorySelector
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
									className="form-control"
									placeholder="请输入商品价格"
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
									className="form-control"
									placeholder="请输入商品库存"
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
										<i
											className="fa fa-times"
											index={index}
											onClick={e => this.deleImg(e)}
										/>
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
						<div className="col-md-10" />
					</div>
					<div className="form-group">
						<div className="col-md-offset-2 col-md-10">
							<button type="submit" className="btn btn-primary">
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
