// aqui de ejemplo colocaremos todas las rutas que se manejaran con un usuario
//Entonces lo que haremos es sacar del pq de express una funcion que es Router -> Para eso hacemos la desestructuracion

const { Router } = require('express');
const { usuarioGet, usuariosPut, usuriosDelete, usuriosPost } = require('../controller/usuarios');

//este router nos ayudara a definir todas la rutas para este usuario en este caso
const router = Router();

//Y sencillamente para las rutas en vez de app o this.app, usamos router para definir cada ruta
//Ya creado nuestro controller, se pasa la referencia de la funcion que se crearon para cada ruta.
router.get('/', usuarioGet);
router.post('/', usuriosPost);
//Para recibir un argumento en la ruta se hace de esta manera /:(y el nombre del parametro a recibir):
router.put('/:id', usuariosPut);
router.delete('/', usuriosDelete);



module.exports = router;
