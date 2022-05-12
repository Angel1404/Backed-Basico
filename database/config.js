//Aqui haremos la conexion y configuracion a la base de datos esta vez de mongo

//Requerimos del pq mongoose que acabamos de instalar
const mongoose = require('mongoose');

//Creamos una funcion de conexion a la bd
const dbConnection = async () => {


    try {

        //Haciendo la conexion a la BD
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('BD online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}



//exportamos
module.exports = {
    dbConnection
};