import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
//import { AddModalHobby } from './AddModalHobby';
import { SendMessage } from './SendMessage';
import Default from '../static/default.png'


var api = "https://localhost:44379/api/Users/suggestions/";
export class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = { suggestions: [], addModalShow: false, editModalShow: false }
    }
    refreshList() {
        let id = sessionStorage.getItem('userid');
        fetch(api + id)
            .then(response => response.json())
            // .then(data=>console.log(data))
            .then(data => {
                this.setState({ suggestions: data });
            });

    }
    componentDidMount() {
        this.refreshList();
    }
    /*componentDidUpdate() {
        this.refreshList();
    }
    */
    render() {
        const { suggestions, firstname, email, hobbies } = this.state;
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
                        <th className="text-center">Name</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Common hobbies</th>
                        <th className="text-center">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {suggestions.map(suggestion => (
                        <tr key={suggestion.UserId}>
                            <td className="text-center">
                                <img
                                    src={suggestion.Url ? suggestion.Url : Default}
                                    alt="Avatar"
                                    className="avatar"
                                    width="70"
                                    height="70"
                                />
                            </td>
                            <td className="text-center">{suggestion.FirstName}</td>
                            <td className="text-center">{suggestion.Email}</td>
                            <td className="text-center">{suggestion.Hobbies}</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center"> {/* Змінений контейнер для відцентровування */}
                                    <ButtonToolbar>
                                        <Button
                                            className="mr-2"
                                            variant="primary"
                                            onClick={() =>
                                                this.setState({
                                                    editModalShow: true,
                                                    firstname: suggestion.FirstName,
                                                    email: suggestion.Email,
                                                    hobbies: suggestion.Hobbies
                                                })
                                            }
                                        >
                                            Send request message
                                        </Button>
                                       
                                    </ButtonToolbar>
                                </div>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </Table>
            <SendMessage
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            usermail={sessionStorage.getItem('username')}
                                            firstname={firstname}
                                            email={email}
                                            hobbies={hobbies}
                                        />
        </div>
    </div>
</div>

        )
    }
}