import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

var api = "https://localhost:44379/api/Hobbies/";
export class EditModalHobby extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log( this.props.id, event.target.id.value,event.target.desc.value,event.target.name.value,sessionStorage.getItem('userid'));
        fetch(api+event.target.id.value, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hobbyid: event.target.id.value,
                name: event.target.name.value,
                desc:event.target.desc.value,
                userId:sessionStorage.getItem('userid'),
            })
           
        })
           // .then(res => res.json())
            .then((result) => {
                toast.success('Updated successfully');
                // alert('Updated');
            },
                (error) => {
                    console.log(error);
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
                            Edit Hobby
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="id">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" name="id" required 
                                            disabled
                                            defaultValue={this.props.id}
                                            placeholder="id" />
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required
                                            defaultValue={this.props.name}
                                            placeholder="name" />
                                    </Form.Group>
                                    <Form.Group controlId="path">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="desc" required 
                                            defaultValue={this.props.desc}
                                            placeholder="description" />
                                    </Form.Group>
                                  
                                   

                                    <Form.Group>
                                        <Button  className="my-2 " variant="primary" type="submit">
                                            Update Hobby
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