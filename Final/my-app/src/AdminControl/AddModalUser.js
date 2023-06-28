import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';


var api="https://localhost:44379/api/Users/";
export class AddModalUser extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
       
        event.preventDefault();
        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                firstName: event.target.firstName.value,
                secondName:event.target.secondName.value,
                age:event.target.age.value,
                email:event.target.email.value,
                role:event.target.role.value,
                pass:event.target.pass.value,
            })
        })
            .then(res => res.json())
            .then((result) => {
                toast.success('Added successfully');
                
               // alert('Added successfully');
            },
                (error) => {
                    toast.error('Failed');
                    //alert('Failed');
                })
    }
    render() {
        
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>FirstName</Form.Label>
                                        <Form.Control type="text" name="firstName" required
                                     
                                            placeholder="firstName" />
                                    </Form.Group>
                                    <Form.Group controlId="secondName">
                                        <Form.Label>SecondName</Form.Label>
                                        <Form.Control type="text" name="secondName" required 
                                          
                                            placeholder="secondName" />
                                    </Form.Group>
                                    <Form.Group controlId="age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="text" name="age" required 
                                        
                                            placeholder="age" />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" required 
                                           
                                            placeholder="email" />
                                    </Form.Group>
                                    <Form.Group controlId="role">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control type="text" name="role"  
                                           
                                            placeholder="role" />
                                    </Form.Group>
                                    <Form.Group controlId="pass">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="pass"  
                                           
                                            placeholder="pass" />
                                    </Form.Group>
                                  
                                
                                           

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add User
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}