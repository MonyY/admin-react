import React, { Component } from 'react';

// 通用table组件
class TableList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFirstLoading: true
		};
	}

	componentWillReceiveProps() {
		// props改变后
		this.setState({
			isFirstLoading: false
		});
	}

	render() {
		let tableHeads = this.props.tableHeads.map((item, index) => {
			if (typeof item === 'object') {
				return (
					<th key={index} width={item.width}>
						{item.name}
					</th>
				);
			} else if (typeof item === 'string') {
				return (
					<th key={index}>
						{item}
					</th>
				);
			}
		});
		let listBody = this.props.children;
		let listInfo = (
			<tr>
				<td colSpan={this.props.tableHeads.length} style={{ textAlign: 'center' }}>
					{this.state.isFirstLoading ? '正在加载数据...' : '没有数据...'}
				</td>
			</tr>
		);
		let tableBody = listBody.length > 0 ? listBody : listInfo;
		return (
			<div className="row">
				<div className="col-md-12">
					<table className="table table-striped table-bordered table-hover">
						<thead>
							<tr>{tableHeads}</tr>
						</thead>
						<tbody>{tableBody}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default TableList;
