const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList =  [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony",
        phone: "1234567890"
    },
    {
        name: "Ganjas",
        phone: "3216549870"
    }
];


app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){console.log("Couldn't fetch the data from the DB.");
        return;
    }
    return res.render('home', {
        title: "My Contacts",
        contact_list: contacts
    });
});
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: 'Let us play with EJS!'
    })
});

app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log("Couldn't create the contact.");
        return;}
        console.log('NEW CONTACT:');
        return res.redirect('back');
    });    
});

app.get('/delete-contact', function(req, res){
    // get the id from query in the url
    let id = req.query.id;

    // find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object from the connected database');
            return;
        }
        return res.redirect('back');
    })
});

app.listen(port, function(err){
    if(err){
        console.log("Error!", err);
    }
    console.log('Success.\nPort:', port);
})