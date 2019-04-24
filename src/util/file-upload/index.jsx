import React, { Component } from 'react';
import FileUpload from './FileUpload.jsx';

class FileUploader extends Component {
	render() {
		const options = {
			baseUrl: '/manage/product/upload.do',
			fileFieldName: 'upload_file',
			chooseAndUpload: true,
			dataType: 'json',
			uploadSuccess: this.props.onSuccess,
			uploadError: this.props.onError
		};

		return (
			<FileUpload options={options}>
				<button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
			</FileUpload>
		);
	}
}

export default FileUploader;
