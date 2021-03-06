import React, { Component } from "react";
import api from "../contact-api";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";

class Contacts extends Component {
  state = { name: "", phone: "", email: "", contacts: [] };

  componentDidMount() {
    api.getContacts().then(contacts => {
      console.log("contacts in fron ", contacts);
      this.setState({ contacts: contacts });
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.getAttribute("name")]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("submission");
    api
      .addContact({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
      })
      .then(data => {
        this.setState({
          name: "",
          email: "",
          phone: "",
          contacts: [...this.state.contacts, data.newContact]
        });
      })
      .catch(err => console.log(err));
  }

  deleteContact(_id) {
    //event.preventDefault();
    console.log(_id, "1111");
    api
      .deleteContact(_id)
      .then(data => {
        this.setState({
          name: "",
          email: "",
          phone: "",
          id: null,
          contacts: this.state.contacts.filter(contact => contact._id !== _id)
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>Your Emergency Contacts</h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: "bold" }}>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <Button outline color="primary" size="sm">
                    <Link
                      to={"/contacts/" + contact._id}
                      id={contact._id}
                      style={{ color: "black" }}
                    >
                      Edit
                    </Link>
                  </Button>{" "}
                  <Button
                    outline
                    color="primary"
                    size="sm"
                    onClick={this.deleteContact.bind(this, contact._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="addnewcontact">
          <h3>Add New Contact</h3>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
              placeholder="Name"
            />
            <br />
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
              placeholder="Email"
            />
            <br />
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange.bind(this)}
              placeholder="Phone"
            />
            <br />
            <div className="createcontact">
              <Button color="primary">Create new contact</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contacts;
