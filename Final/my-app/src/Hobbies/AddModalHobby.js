import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';


var api="https://localhost:44379/api/Hobbies/";
export class AddModalHobby extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let id=sessionStorage.getItem('userid');
        event.preventDefault();
        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                name: event.target.name.value,
                desc:event.target.description.value,
                userId:id,
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
                            Add Hobby
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required
                                            placeholder="name" />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required
                                            placeholder="description" />
                                    </Form.Group>
                                           

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Hobby
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