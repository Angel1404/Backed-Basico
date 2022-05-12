
//Exportamos el modelo del rol

const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const validarRol = async (rol = '') => {
    //consultamos en la base de datos si el dato que obtenemos es alguno de los que predefinimos
    const existRol = await Role.findOne({ rol });
    //Preguntamos que si no existe pues que mande el error pertinente
    if (!existRol) {
        //Para lanzar un error personalizado se hace de la siguiente manera:
        throw new Error(`El rol ${rol} no es un rol valido`);
    }
}

const exitEmail = async (correo = '') => {

    //Verificamos si el correo ya existe
    //Lo vamos a hacer con una funcion de nuestro usuario que seria el findOne -> que seria que buscara un paramatro o valor que uno le pasara
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`Ya existe un usuario con el correo: ${correo}`);
    }
}

const existeUsuarioXId = async (id) => {

    //Verificamos si el id ya existe - con mongo usamos la funcion findbyid
    const existeId = await Usuario.findById({ id });

    //Y si no existe, le mandamos un mensaje de error
    if (!existeId) {
        return new Error(`El id no existe: ${id}`);
    }
}


module.exports = {
    validarRol,
    exitEmail,
    existeUsuarioXId,
}