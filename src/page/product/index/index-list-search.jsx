import React from 'react';

class ListSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchType: 'productName',
			searchKeyword: ''
		};
	}

	onValueChange(e) {
		let name = e.target.name,
			value = e.target.value.trim();
		this.setState({
			[name]: value
		});
	}

	onSearch() {
		this.props.search(this.state);
	}

	onKeyUp(e) {
		if (e.keyCode === 13) {
			this.onSearch();
		}
	}

	render() {
		return (
			<div className="row search-wrap">
				<div className="col-md-12">
					<div className="form-inline">
						<div className="form-group">
							<select
								name="searchType"
								className="form-control"
								value={this.state.searchType}
								onChange={e => {
									this.onValueChange(e);
								}}
							>
								<option value="productName">按商品名称查询</option>
								<option value="productId">按商品ID查询</option>
							</select>
						</div>
						<div className="form-group">
							<input
								type="text"
								name="searchKeyword"
								value={this.state.searchKeyword}
								className="form-control"
								placeholder="关键词"
								onKeyUp={e => {
									this.onKeyUp(e);
								}}
								onChange={e => {
									this.onValueChange(e);
								}}
							/>
						</div>
						<button
							type="submit"
							className="btn btn-primary"
							onClick={e => {
								this.onSearch();
							}}
						>
							查询
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ListSearch;
