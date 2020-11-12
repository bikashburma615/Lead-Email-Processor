import React from 'react';
import {
	Form,
	Button,
	Card
} from 'react-bootstrap';

const Login = () => {
	return <React.Fragment>
		<Card style={{ width: '50%', margin: 'auto', marginTop: '60px' }}>
			<Card.Title class="text-center">LOGIN</Card.Title>
			<Card.Body>
				<Form>
					<Form.Group>
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Login
  				</Button>
				</Form>
			</Card.Body>
		</Card>
	</React.Fragment>

}

export default Login;