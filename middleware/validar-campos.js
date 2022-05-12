const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {

    //Ahora aqui que ya colocamos nuestro middleware capturamos la respuesta a ver si hay o no errores en la validacion
    //Al validationResult le pasamos como param la request
    const errors = validationResult(req);

    //Varificamos si los errores o el resultado viene vacio
    if (!errors.isEmpty()) {
        //Si los errores no vienen vacios pues le mandamos un mensaje del error y el status correspondiente
        return res.status(400).json(errors);
    }

    //El next es una funcion para indicar que siga al siguiente moddleware si llega a este punto 
    next();
};

module.exports = {

    validarCampos
};