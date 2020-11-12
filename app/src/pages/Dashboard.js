import React from 'react';
import { useDropzone } from 'react-dropzone';
import {
	Card,
	Row,
	Col,
	Button
} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import { http } from '../utils/http';

const Dashboard = () => {
	const {
		acceptedFiles,
		fileRejections,
		getRootProps,
		getInputProps
	} = useDropzone({
		accept: '.xlsx',
		maxFiles: 1
	});

	const acceptedFileItems = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	const fileRejectionItems = fileRejections.map(({ file, errors }) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
			<ul>
				{errors.map(e => (
					<li key={e.code}>{e.message}</li>
				))}
			</ul>
		</li>
	));

	const uploadFile = async () => {
		console.log('here');
		const formData = new FormData();

		formData.append('file', acceptedFileItems[0]);

		await http.post('/upload-emails', formData);
	}

	return <React.Fragment>
		<Card>
			<Card.Title>Upload File</Card.Title>
			<Card.Body>
				<section className="container">
					<div {...getRootProps({ className: 'dropzone' })}>
						<input {...getInputProps()} />
						<p>Drag 'n' drop some files here, or click to select files</p>
						<em>(Only *.xlsx files will be accepted)</em>
					</div>
					<aside>
						{/* <h4>Accepted files</h4> */}
						<ul>{acceptedFileItems}</ul>
						{/* <h4>Rejected files</h4> */}
						{/* <ul>{fileRejectionItems}</ul> */}
					</aside>
				</section>
			</Card.Body>
			<Button variant="primary" type="button" onClick={uploadFile}>
				Upload
  		</Button>
		</Card>
	</React.Fragment>
}

export default Dashboard;