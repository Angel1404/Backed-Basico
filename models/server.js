const express = require('express');
const cors = require('cors');
class Server {

    constructor() {

        this.app = express();

        this.port = process.env.PORT;

        //Para ser un poco mas claro en la ruta de la api que andamos usando, podemos definirla aqui en el constructor
        this.pathUsuariosApi = '/api/usuarios';

        //Definiendo un middleware
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    //Metodo para definir mi middleware
    middlewares() {

        //Configuracion del cors -> es necesario
        this.app.use(cors());

        //para la lectura y parseo de json, datos enviados por parametros
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    //Metodo para las rutas
    routes() {
        //para hacer uso de esas rutas configuradas en otro archivo, lo que tendremos que hacer es un middleware en si
        //Seria algo tal que:
        //Primeramente definimos la ruta a la cual queremos que apunte este middleware.
        //De seguido de donde va a coger las rutas(de que directorio o ruta).
        /*NOTA: los nombres de las rutas definidas en el archivo a donde apuntamos deben ser removidas.
        ya que aqui se especifica la ruta a la cual se accederan a los metodos de user.
        */
        this.app.use(this.pathUsuariosApi, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;