'use strict'
const mongoose         = require('mongoose');
const bcrypt           = require('bcrypt');
const mongoConnection  = require('../db/db.js');
const usersDatabase    = mongoConnection.useDb('NodeJWT');


const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})


// salt password before saving
User.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(11);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})


// validate password
User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}



module.exports = usersDatabase.model('NodeJWT', User, 'users'); // (database, schema, collection)
