//Aqui se van a controlar todas las funciones de las rutas de usuario

//Para tener el tipado de la respuesta de las funciones exportamos una propiedad de exoress que es la response
const { response, request } = require('express');

//Importamos el model de usuario que creamos de moggose
const Usuario = require('../models/usuario');

//Requerimos el pq que nos ayudara a encriptar la contraseña
const bcryptjs = require('bcryptjs');


//Para crear las funciones de los metodos seria lo siguiente:
const usuarioGet = async (req = request, res = response) => {
    //Para recibir parametros como query -> despues de un ?q=''&apikey='': se hace de esta manera.
    //Tambien podemos ponerle valores por defecto en caso de que no se mandara nada por esta ruta
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //Para hacer un limite y desde donde queremos los registros serian de la siguiente manera :
    // const usuarios = await Usuario.find().skip(Number(desde)).limit(Number(limite));

    //Si necesitamos realizar varias promesas en nuestro metodo, es mejor utilizar el metodo
    //Promise.all([]) -> El cual recibe un arreglo de todas las promesas que necesitamos ejecutar
    //La ventaja que tenemos es que se ejecutan de una manera mas rapida y tenemos mejor respuesta ya que se
    //Ejecutan de manera simultanea 
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({ "total": total, "usuarios": usuarios });
}

const usuriosPost = async (req = request, res = response) => {

    //Obtener lo enviado por el usuario en el body.
    //Tambien se puede usar desestructuracion para obtener lo que se necesite.
    //Como necesitamos ciertos valores del body(los que son obligatorios), los extreamos
    const { nombre, correo, password, rol } = req.body;

    /*Creamos una nueva instancia del Usuario o modelo,
    Le mandamos como parametro el body que recibimos
    Y para que no haya errores hay que mandar todos los daros requeridos que colocamos al crear el schema. 
    si no tirara el error al momento de intentar guardar los datos en la bd
    - y aca para grabar el usuio lo que le mandamos es un objeto-
    */
    const usuario = new Usuario({ nombre, correo, password, rol });

    //--Encriptar la contraseña--
    /*Este metodo es para decir cuantas vueltas de encriptado se quieren para que la contraseña sea mas segura 
    por defecto esta en 10, entre mas vueltas mas segura es la encriptacion y mas tiempo se toma en hacer el proceso
    */
    const salt = bcryptjs.genSaltSync();
    //Le hacemos el hash a la contraseña, y con el metodo hashSync la encriptamos en una sola via
    //Tomamos la contraseña del usuario.
    //El primer parametro del metodo, es el string que queremos encriptar, y el segundo parametro son las vueltas o sea el salt
    usuario.password = bcryptjs.hashSync(password, salt);

    //Para guardar los datos en la bd se debe hacer el :
    await usuario.save();

    res.json({ msg: 'Respuesta Post', usuario });
}

const usuariosPut = async (req = request, res = response) => {

    //Para recibir el argummento que venga por la url, se hace por medio de la 
    //req.params -> ahi vendra un objeto con todo lo colocado en la url como parametro
    const id = req.params.id;
    //Extraemos la informacion que no vamos a necesitar
    const { password, google, ...resto } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    // O const {id} = req.params;
    res.json({ msg: 'Respuesta put', usuario });
}

const usuriosDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({ usuario });
}

//Exportamos en un objeto los metodos, ya que seran varios
module.exports = {
    usuarioGet,
    usuriosPost,
    usuariosPut, usuriosDelete,
}