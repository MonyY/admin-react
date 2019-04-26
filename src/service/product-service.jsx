import MUtil from 'util/comm.jsx';

const _mm = new MUtil();

class Product {
	// 获取商品列表
	getProductList(param) {
		let url = '',
			data = {};

		if (param.listType === 'list') {
			url = '/manage/product/list.do';
		} else if (param.listType === 'search') {
			url = '/manage/product/search.do';
			data[param.searchType] = param.searchKeyword;
		}
		data.pageNum = param.pageNum;

		return _mm.request({
			type: 'post',
			url,
			data
		});
	}

	// 获取商品详情
	getProduct(id = 0) {
		return _mm.request({
			url: '/manage/product/detail.do',
			data: {
				productId: id
			}
		});
	}

	// 修改商品状态
	setProductStatus(data) {
		return _mm.request({
			url: '/manage/product/set_sale_status.do',
			data
		});
	}

	/* 
		品类相关
	*/
	// 获取商品分类
	getCategoryList(id = 1) {
		return _mm.request({
			url: '/manage/category/get_category.do',
			data: {
				categoryId: id
			}
		});
	}

	// 保存商品
	saveProduct(product) {
		return _mm.request({
			url: '/manage/product/save.do',
			data: product
		});
	}
}

export default Product;
