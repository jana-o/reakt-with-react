var express = require("express");
const Contact = require("../models/contact");

var router = express.Router();

// Route to get all contacts
router.get("/contacts", (req, res, next) => {
  Contact.find()
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => next(err));
});

router.get("/add-contacts", (req, res, next) => {
  Contact.find()
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => next(err));
});

//api.postContacts(data)
// .then(result => {
//this.props.history.push("/contacts") => redirected to page contacts after
// .this.setState({
//     name:"",
//      email:"",
//      phone:""
// })
// })

// Route to add a contact
router.post("/add-contact", (req, res, next) => {
  let { name, email, phone } = req.body;
  Contact.create({ name, email, phone })
    .then(contact => {
      res.json({
        success: true,
        contact
      });
    })
    .catch(err => next(err));
});

module.exports = router;
