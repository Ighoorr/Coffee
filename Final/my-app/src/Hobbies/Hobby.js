import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddModalHobby } from './AddModalHobby';
import { EditModalHobby } from './EditModalHobby';
import { toast } from "react-toastify";

import 'bootstrap/dist/css/bootstrap.css';


var api = "https://localhost:44379/api/Hobbies/";
export class Hobby extends Component{
    constructor(props) {
        super(props);
        this.state = { hobbies: [] , addModalShow: false, editModalShow: false  }
    }
    refreshList() {
        let id = sessionStorage.getItem('userid');
        fetch(api+"user/"+id)
            .then(response => response.json())
            // .then(data=>console.log(data))
            .then(data => {
                this.setState({ hobbies: data });
            });

    }
    componentDidMount() {
        this.refreshList();
    }
    componentDidUpdate() {
        this.refreshList();
    }
    deleteHobby(id){
        if(window.confirm('Are you sure?')){
            fetch(api + +id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render() {
        const { hobbies,id,name,desc } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (

            <div className="mt-5 d-flex justify-content-left">
                <div className="container">
                    <div className="row">
                        <Table className="mt-4" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="text-center">Id</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Desc</th>
                                    <th className="text-center">Options</th>
                                  
              
                                </tr>
                            </thead>
                            <tbody>
                                {hobbies.map(hobby =>
                                    <tr key={hobby.HobbyId}>
                                        <td className="text-center">{hobby.HobbyId}</td>
                                        <td className="text-center">{hobby.Name}</td>
                                        <td className="text-center">{hobby.Desc}</td>
                                       
                                        
                                        <td className="text-center">
                                        <div className="d-flex justify-content-center">
                                            <ButtonToolbar>
                                            <Button className="mr-2 mx-2" variant="info"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    id:hobby.HobbyId,name:hobby.Name,desc:hobby.Desc
                                                })}>
                                                Edit
                                            </Button>
                                            {' '}
                                            <Button className="mr-2" variant="danger"
                                               onClick={() => this.deleteHobby(hobby.HobbyId)}>
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
                                Add hobby</Button>

                            <AddModalHobby show={this.state.addModalShow}
                                onHide={addModalClose} />
                        </ButtonToolbar>
                         <EditModalHobby show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                id={id}
                                                name={name}
                                                desc={desc}
                                            
                                            />
                    </div>
                    
                </div>

               


            </div>
        )
    }
}