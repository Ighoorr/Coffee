import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

var api = "https://localhost:44379/api/Users/request/";
var mess="";
export class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        mess= `Hello ${this.props.firstname}!\n\nWe are excited to inform you that we have found a new match for you based on your hobbies.\nUser ${this.props.usermail} shares similar hobbies with you.\n\nHobbies in common: ${this.props.hobbies}\n\nFeel free to connect with ${this.props.usermail} and explore your shared interests!How about meeting up for a coffee and discussing your hobbies in more detail?\nWe believe this could be a great opportunity to bond over your shared passions.\n\nBest regards,\nYour App Team`;
    }

    handleSubmit(event) {
        event.preventDefault();
       // console.log( this.props.id, event.target.id.value,event.target.desc.value,event.target.name.value,sessionStorage.getItem('userid'));
        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: this.props.email,
                body: event.target.mess.value
            })
           
        })
           // .then(res => res.json())
            .then((result) => {
                toast.success(' successfully');
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
                    <Modal.Header closeButton >
                        <Modal.Title id="contained-modal-title-vcenter" >
                            Check  Message
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                   
                                    <Form.Group controlId="mess">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control type="text" name="mess" required as="textarea" rows={13}
                                            defaultValue={`Hello ${this.props.firstname}!\n\nWe are excited to inform you that we have found a new match for you based on your hobbies.\nUser ${this.props.usermail} shares similar hobbies with you.\n\nHobbies in common: ${this.props.hobbies}.\n\nFeel free to connect with ${this.props.usermail} and explore your shared interests! How about meeting up for a coffee and discussing your hobbies in more detail?\nWe believe this could be a great opportunity to bond over your shared passions.\n\nBest regards,\nYour Coffee App Team`}
                                            placeholder="Message" />
                                    </Form.Group>
                                  
                                   

                                    <Form.Group className="text-center">
                                        <Button variant="primary" type="submit">
                                             Send
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