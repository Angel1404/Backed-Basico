//Requerimos mongoose para rear el esquema y el modelo que vamos a utilizar 
const { Schema, model } = require('mongoose');


//Creamos el esquema que vamos a trabajar
const usuarioSchema = Schema({
    nombre: {
        type: String,
        //se manda en el primer parametro para decir si es obigatorio o no y segundo un mensaje si hay un error
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        //se manda en el primer parametro para decir si es obigatorio o no y segundo un mensaje si hay un error
        required: [true, 'El nombre es obligatorio'],
        //Esto es para decirle a mongo que es unico este campo
        unique: true
    },
    password: {
        type: String,
        //se manda en el primer parametro para decir si es obigatorio o no y segundo un mensaje si hay un error
        required: [true, 'La contraseña es obligatoria'],

    },
    img: {
        type: String,

    },
    rol: {
        type: String,
        //se manda en el primer parametro para decir si es obigatorio o no y segundo un mensaje si hay un error
        required: true,
        //Esto es para si queremos que solo se guarden dos tipos de valores
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    //este es para cuando un usuario sea mandado a eliminar se le cambie el valor y pues se traiga el que este activo
    estado: {
        type: Boolean,
        //Esto es para que el estado inicialmente este en true
        default: true,
    },
    //Esto es para saber si el usuario fue creado por google
    google: {
        type: Boolean,
        default: false,
    }
});

//Para exentar algunos valores para nuestra respuesta usamos lo siguiente 
usuarioSchema.methods.toJSON = function () {
    //Se desestructura los elementos que se van a mostrar
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

//lo que vamos a exportar sera el metodo model.
//esto lo que hare al igual sera crear la coleccion en mongoose,
//Lo primero que pide es el nombre de la coleccion
//lo segundo es el schema que creamos arriba.
module.exports = model('Usuario', usuarioSchema);