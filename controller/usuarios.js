//Aqui se van a controlar todas las funciones de las rutas de usuario

//Para tener el tipado de la respuesta de las funciones exportamos una propiedad de exoress que es la response
const { response, request } = require('express');

//Para crear las funciones de los metodos seria lo siguiente:
const usuarioGet = (req = request, res = response) => {
    //Para recibir parametros como query -> despues de un ?q=''&apikey='': se hace de esta manera.
    //Tambien podemos ponerle valores por defecto en caso de que no se mandara nada por esta ruta
    const { q = 'no hay nada', apikey = null } = req.query;
    res.json({ msg: 'Metodo Get', q, apikey });
}

const usuriosPost = (req = request, res = response) => {

    //Obtener lo enviado por el usuario en el body.
    //Tambien se puede usar desestructuracion para obtener lo que se necesite
    const body = req.body;


    res.json({ msg: 'Respuesta Post', body });
}

const usuariosPut = (req = request, res = response) => {
    //Para recibir el argummento que venga por la url, se hace por medio de la 
    //req.params -> ahi vendra un objeto con todo lo colocado en la url como parametro
    const id = req.params.id;
    // O const {id} = req.params;
    res.json({ msg: 'Respuesta put', id });
}

const usuriosDelete = (req = request, res = response) => {
    res.json({ msg: 'Respuesta delete' });
}

//Exportamos en un objeto los metodos, ya que seran varios
module.exports = {
    usuarioGet,
    usuriosPost,
    usuariosPut, usuriosDelete,
}