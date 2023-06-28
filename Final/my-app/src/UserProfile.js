import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import Default from './static/default.png'
var api = "https://localhost:44379/api/Users/";


export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            secondName: '',
            age: '',
            email: '',
            password: '',
            photo: null,
            file: null,
            uploading: false, // Стан для відстеження завантаження
            updating: false // Стан для відстеження оновлення інформації про користувача
        };
    }

    componentDidMount() {
        this.refresh();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handlePhotoChange = (event) => {
        const file = event.target.files[0];
        this.setState({ file: file });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Update user information
        let id = sessionStorage.getItem('userid');
        this.setState({ updating: true }); // Блокуємо кнопки

        fetch(api + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: id,
                FirstName: this.state.firstName,
                SecondName: this.state.secondName,
                Age: this.state.age,
                Email: this.state.email,
                Pass: this.state.password
            })
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('User information updated successfully');
                } else {
                    toast.error('Failed to update user information');
                }
                this.setState({ updating: false }); // Розблоковуємо кнопки
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed to update user information');
                this.setState({ updating: false }); // Розблоковуємо кнопки
            });
    }


    handlePhotoSubmit = (event) => {
        event.preventDefault();
        // Set uploading state to true
        this.setState({ uploading: true });
    
        // Upload photo
        let id = sessionStorage.getItem('userid');
        let formData = new FormData();
        formData.append('file', this.state.file);
    
        fetch(api + 'addphoto/' + id, {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    // Photo uploaded successfully, update the component state
                    return response.json();
                } else {
                    toast.error('Failed to upload photo');
                    throw new Error('Failed to upload photo');
                }
            })
            .then((data) => {
                // Update the component state with the received photo
                this.setState({ photo: data, uploading: false }); // Set uploading state to false
                toast.success('Photo uploaded successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed to upload photo');
                this.setState({ uploading: false }); // Set uploading state to false
            });
    }
    
    deletePhoto = () => {
        // Set uploading state to true
        this.setState({ uploading: true });
    
        // Delete photo
        let id = sessionStorage.getItem('userid');
        fetch(api + 'deletephoto/' + id, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    // Photo deleted successfully, update the component state
                    this.setState({ photo: null, uploading: false }); // Set uploading state to false
                    toast.success('Photo deleted successfully');
                } else {
                    toast.error('Failed to delete photo');
                    throw new Error('Failed to delete photo');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed to delete photo');
                this.setState({ uploading: false }); // Set uploading state to false
            });
    }
    

    refresh() {
        // Fetch user information from the API
        let id = sessionStorage.getItem('userid');
        fetch(api + id) // Replace 'user-id' with the actual user ID
            .then((response) => response.json())
            .then((data) => {
                // Update the component state with the retrieved data
                this.setState({
                    firstName: data.FirstName,
                    secondName: data.SecondName,
                    age: data.Age,
                    email: data.Email,
                    password: data.Pass,
                    photo: data.Photo
                });
                this.render();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed to fetch user information');
            });

    }



    render() {
        return (
            <div className="container">
                <Row>
                    <Col sm={6}>
                        <h2 className="text-center">User Information</h2>
                        <Form onSubmit={this.handleSubmit} className="d-flex flex-column align-items-center">
                            <Form.Group controlId="firstName" className="w-50">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                    placeholder="First Name"
                                    required
                                    disabled={this.state.updating} // Блокуємо поле вводу при оновленні
                                />
                            </Form.Group>
                            <Form.Group controlId="secondName" className="w-50">
                                <Form.Label>Second Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="secondName"
                                    value={this.state.secondName}
                                    onChange={this.handleInputChange}
                                    placeholder="Last Name"
                                    required
                                    disabled={this.state.updating} // Блокуємо поле вводу при оновленні
                                />
                            </Form.Group>
                            <Form.Group controlId="age" className="w-50">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={this.state.age}
                                    onChange={this.handleInputChange}
                                    placeholder="Age"
                                    required
                                    disabled={this.state.updating} // Блокуємо поле вводу при оновленні
                                />
                            </Form.Group>
                            <Form.Group controlId="email" className="w-50">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"//type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    placeholder="Email"
                                    required
                                    disabled={this.state.updating} // Блокуємо поле вводу при оновленні
                                />
                            </Form.Group>
                            <Form.Group controlId="password" className="w-50">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    placeholder="Password"
                                    required
                                    disabled={this.state.updating} // Блокуємо поле вводу при оновленні
                                />
                            </Form.Group>
                            <Button className="mt-4" variant="primary" type="submit" disabled={this.state.uploading|| this.state.updating}>
                                Update User Information
                            </Button>
                        </Form>
                    </Col>
                    <Col sm={6}>

                        <h2 className="text-center mb-4">Photo Upload</h2>
                        <Form className="text-center mb-4" onSubmit={this.handlePhotoSubmit}>
                            <div className="avatar mb-4">
                                {this.state.uploading ? (
                                      <Spinner animation="border" role="status" variant="primary" style={{ width: '150px', height: '150px' }}>
                                      <span className="sr-only">Uploading...</span>
                                    </Spinner>
                                ) : (
                                    <img
                                        src={this.state.photo ? this.state.photo.Url : Default}
                                        alt="Avatar"
                                        className="avatar-image"
                                        width="150"
                                        height="150"
                                    />
                                )}
                            </div>
                            <Form.Group>
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*" // Accept only image files
                                    onChange={this.handlePhotoChange}
                                    required
                                    disabled={this.state.uploading} // Блокуємо поле вводу при завантаженні
                                />
                            </Form.Group>
                              <Button className="mx-2 my-2" variant="primary" type="submit" disabled={this.state.uploading || this.state.updating }>
                                Upload Photo
                            </Button>
                            <Button className="mx-2 my-2 btn-danger" variant="primary" onClick={this.deletePhoto} disabled={this.state.uploading || this.state.updating}>
                                Delete Photo
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserProfile;

