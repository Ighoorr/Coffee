import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
           
            <NavLink className="d-inline p-2 bg-dark text-white" to="/hobby">
                Hobby
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/suggestion">
                Suggestion
            </NavLink>
    

            </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}