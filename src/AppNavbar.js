import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Logo from './logo.svg';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            speed: 15
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <img height="40px" style={{animation: `App-logo-spin ${this.state.speed}s linear infinite`}} src={Logo} alt="logo.svg"/>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <img height="40px" style={{animation: `App-logo-spin ${this.state.speed}s linear infinite`}} src={Logo} alt="logo.svg"/>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            href="https://www.linkedin.com/in/alexander-lundin-83084a7a/">@LinkedIn</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/AlexanderLundin/fast-food-rest-api">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}