const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contacts_list_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Couldn"t connect to the database.'));

db.once('open', function(){
    console.log('DB is also connected.')
});