import React from 'react';
import Login_Button from '../Buttons/Login_Button';
import Signup_Button from '../Buttons/Signup_Button';
import {Col, Form, Row} from 'react-bootstrap';
import '../Styles/authButtonStyles.css';
const AuthButton_Container = () =>{
	return (
		<Form className={'authButtonContainer'}>
			<Row className={'authButtonRow'}>
				<Col className={'authButtonCol'}>
					<Login_Button/>
				</Col>
				<Col className={'authButtonCol'}>
					<Signup_Button/>
				</Col>
			</Row>
		</Form>
	);  
};
export default AuthButton_Container;