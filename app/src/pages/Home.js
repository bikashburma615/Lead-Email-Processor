import React from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Card
} from 'react-bootstrap';

const Home = () => {

	const createMarkup = () => {
		return { __html: 'Hi Stephen, \n Many thanks for your email to Lauren below.' }
	}
	return <React.Fragment>
		<Container className="mt-5">
			<Row>
				<Col>
					<div className="button-group-container">
						<Button variant="primary">Positive Reply</Button>
						<Button variant="primary">Neutral Reply</Button>
						<Button variant="primary">Not a Lead</Button>
					</div>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col>
					<Card>
						<Card.Body>
							<div dangerouslySetInnerHTML={createMarkup()}>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	</React.Fragment>
}

export default Home;