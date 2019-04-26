import React, { Component } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
// 引入默认编辑器样式
import 'braft-editor/dist/index.css';
// 引入自定义编辑器样式
import './index.scss';

import { Upload, Icon } from 'antd';
import axios from 'axios';

// 通用富文本编辑器
class RichEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// 创建一个空的editorState作为初始值
			editorState: BraftEditor.createEditorState(null)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.defaultDetail !== nextProps.defaultDetail) {
			this.setState({
				editorState: BraftEditor.createEditorState(nextProps.defaultDetail)
			});
		}
	}

	// 编辑器内容改变时触发
	handleEditorChange(editorState) {
		this.setState({ editorState });
		if (typeof this.props.onEditorChange === 'function') {
			this.props.onEditorChange(editorState.toHTML());
		}
	}

	// 上传图片
	uploadHandler(param) {
		if (!param.file) {
			return false;
		}
		let form = new FormData();
		form.append('upload_file', param.file);
		axios({
			url: '/manage/product/richtext_img_upload.do',
			method: 'post',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: form
		})
			.then(res => {
				if (res.data.success) {
					this.setState({
						editorState: ContentUtils.insertMedias(this.state.editorState, [
							{
								type: 'IMAGE',
								url: res.data.file_path
							}
						])
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const excludeControls = ['redo', 'undo', 'emoji', 'link', 'media'];
		const extendControls = [
			{
				key: 'antd-uploader',
				type: 'component',
				component: (
					<Upload
						name="upload_file"
						accept="image/*"
						showUploadList={false}
						customRequest={e => this.uploadHandler(e)}
					>
						<button
							type="button"
							className="control-item button upload-button"
							data-title="插入图片"
						>
							<Icon type="picture" theme="filled" />
						</button>
					</Upload>
				)
			}
		];
		return (
			<div className="rich-editor">
				<BraftEditor
					className="braftEditor"
					contentClassName="editorContent"
					placeholder="请输入商品详情..."
					excludeControls={excludeControls}
					extendControls={extendControls}
					value={this.state.editorState}
					onChange={e => this.handleEditorChange(e)}
				/>
			</div>
		);
	}
}

export default RichEditor;
