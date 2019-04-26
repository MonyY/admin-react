import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import CategoryList from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product/category/add.jsx';

class ProductRouter extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/product/index" component={ProductList} />
				<Route path="/product/save/:id?" component={ProductSave} />
				<Route path="/product-category/index/:id?" component={CategoryList} />
				<Route path="/product-category/add" component={CategoryAdd} />
				<Redirect exact from="/product" to="/product/index" />
				<Redirect exact from="/product-category" to="/product-category/index" />
			</Switch>
		);
	}
}

export default ProductRouter;
