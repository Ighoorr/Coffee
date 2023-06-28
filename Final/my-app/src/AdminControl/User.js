import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddModalUser } from './AddModalUser';
import { EditModalUser } from './EditModalUser';
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

import 'bootstrap/dist/css/bootstrap.css';
import Default from '../static/default.png'


var api = "https://localhost:44379/api/Users/";
export class User extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], addModalShow: false, editModalShow: false }
    }
    refreshList() {

        fetch(api)
            .then(response => response.json())
            // .then(data=>console.log(data))
            .then(data => {
                this.setState({ users: data });
            });

    }
    componentDidMount() {
        this.refreshList();
    }
    componentDidUpdate() {
        this.refreshList();
    }
    deleteUser(userId) {
        if (window.confirm('Are you sure?')) {
            fetch(api + userId, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    render() {
        if (sessionStorage.getItem('userRole') !== 'admin') {
            // Redirect the user to a different page or show an error message
            toast.error('You dont have permision');
            return <Navigate to="/" />
        }
        const { users, userId, firstName, secondName, age, email, role,photo } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (

            <div className="mt-5 d-flex justify-content-left">
                <div className="container">
                    <div className="row">
                        <Table className="mt-4" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="text-center">Avatar</th>
                                    <th className="text-center">Id</th>
                                    <th className="text-center">FirstName</th>
                                    <th className="text-center">SecondName</th>
                                    <th className="text-center">Age</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Role</th>
                                    <th className="text-center">Options</th>


                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user =>
                                    <tr key={user.UserId}>
                                        <td className="text-center">
                                            <img
                                                src={user.Photo ? user.Photo.Url : Default}
                                                alt="Avatar"
                                                className="avatar"
                                                width="70"
                                                height="70"
                                            />

                                        </td>
                                        <td className="text-center">{user.UserId}</td>
                                        <td className="text-center">{user.FirstName}</td>
                                        <td className="text-center">{user.SecondName}</td>
                                        <td className="text-center">{user.Age}</td>
                                        <td className="text-center">{user.Email}</td>
                                        <td className="text-center">{user.Role}</td>


                                        <td className="text-center">
                                            <div className="d-flex justify-content-center">

                                                <ButtonToolbar>
                                                    <Button className="mr-2 mx-2" variant="info"
                                                        onClick={() => this.setState({
                                                            editModalShow: true,
                                                            userId: user.UserId,
                                                            firstName: user.FirstName,
                                                            secondName: user.SecondName,
                                                            age: user.Age,
                                                            email: user.Email,
                                                            role: user.Role,
                                                            photo:user.Photo
                                                        })}
                                                    >
                                                        Edit
                                                    </Button>
                                                    {' '}
                                                    <Button className="mr-2 " variant="danger"
                                                        onClick={() => this.deleteUser(user.UserId)}
                                                    >
                                                        Delete
                                                    </Button>
                                                   
                                                </ButtonToolbar>


                                            </div>
                                        </td>


                                    </tr>)}
                            </tbody>

                        </Table>
                    </div>
                    <div className="row">
                        <ButtonToolbar>
                            <Button variant='primary'
                                onClick={() => this.setState({ addModalShow: true })}>
                                Add user</Button>

                            <AddModalUser show={this.state.addModalShow}
                                onHide={addModalClose} />
                        </ButtonToolbar>
                         <EditModalUser show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        userid={userId}
                                                        firstname={firstName}
                                                        secondname={secondName}
                                                        age={age}
                                                        email={email}
                                                        role={role}
                                                        photo={photo}
                                                    />
                    </div>

                </div>




            </div>
        )
    }
}