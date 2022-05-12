const { Schema, model } = require('mongoose');


const rolCheme = Schema({

    rol: {
        type: String,
        required: [true, 'El rol es necesario']
    }
});

module.exports = model('Role', rolCheme);