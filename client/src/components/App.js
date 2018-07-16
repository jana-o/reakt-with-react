import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
// import Header from "./Layouts/header";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import Footer from "./Layouts/footer";
import Home from "./Home";
//import MapContainer from "./map";
//import GoogleMapReact from "google-map-react";

import Profile from "./Profile";
import Contacts from "./Contacts";
import Login from "./Login";
import Signup from "./Signup";
// import Map from "./Map";
import api from "../api";
import "./App.css";
import ContactDetail from "./ContactDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    (this.state = {
      isOpen: false,
      earthquakes: []
    }),
      api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar color="secondary" light expand="md">
          <NavbarBrand href="/">Disasterbase</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {api.isLoggedIn() && (
                  <NavLink href="/contacts">Contacts </NavLink>
                )}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && <NavLink href="/profile">Profile</NavLink>}
              </NavItem>

              <NavItem>
                {api.isLoggedIn() && <NavLink href="/">Logout</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          {/* <header className="Header">
          <div className="Navbar" />
          <Link to="/">Home </Link>

          {api.isLoggedIn() && <Link to="/contacts">Contacts </Link>}
          <Link to="/profile">Profile </Link>
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Login</Link>}
          {!api.isLoggedIn() && <Link to="/profile">Profile</Link>}

          {api.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
        </header> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={Profile} />

            <Route path="/contacts" exact component={Contacts} />
            <Route path="/contacts/:id" exact component={ContactDetail} />

            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />

            <Route render={() => <h2>404</h2>} />
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
