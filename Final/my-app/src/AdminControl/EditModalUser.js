import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import Default from '../static/default.png'
var api = 'https://localhost:44379/api/Users/';

export class EditModalUser extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(api + event.target.userId.value, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: event.target.userId.value,
        firstName: event.target.firstName.value,
        secondName: event.target.secondName.value,
        age: event.target.age.value,
        email: event.target.email.value,
        role: event.target.role.value,
      }),
    })
      .then((result) => {
        toast.success('Updated successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed');
      });
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
              Edit User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="userId">
                    <Form.Label>UserId</Form.Label>
                    <Form.Control
                      type="text"
                      name="userId"
                      required
                      disabled
                      defaultValue={this.props.userid}
                      placeholder="userId"
                    />
                  </Form.Group>
                  <Form.Group controlId="firstName">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      required
                      defaultValue={this.props.firstname}
                      placeholder="firstName"
                    />
                  </Form.Group>
                  <Form.Group controlId="secondName">
                    <Form.Label>SecondName</Form.Label>
                    <Form.Control
                      type="text"
                      name="secondName"
                      required
                      defaultValue={this.props.secondname}
                      placeholder="secondName"
                    />
                  </Form.Group>
                  <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="text"
                      name="age"
                      required
                      defaultValue={this.props.age}
                      placeholder="age"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"//text
                      name="email"
                      required
                      defaultValue={this.props.email}
                      placeholder="email"
                    />
                  </Form.Group>
                  <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      defaultValue={this.props.role}
                      placeholder="role"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button  className="my-2 "variant="primary" type="submit">
                      Update User
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={6} className="d-flex align-items-center justify-content-center">
                <Image
                  src={this.props.photo? this.props.photo.Url:Default}
                  alt="User Photo"
                  style={{ width: '200px', height: '200px' }}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
