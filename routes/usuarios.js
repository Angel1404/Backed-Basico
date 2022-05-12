// aqui de ejemplo colocaremos todas las rutas que se manejaran con un usuario
//Entonces lo que haremos es sacar del pq de express una funcion que es Router -> Para eso hacemos la desestructuracion

const { Router } = require('express');

const { usuarioGet, usuariosPut, usuriosDelete, usuriosPost } = require('../controller/usuarios');

//Requerimos el paquete de express-validacion. para la vidaciones de campos
//Vamos a entraer una propiedad o metodo del pq de express-validation
const { check } = require('express-validator');

//Nuestra clase de middleware que salta los errores si los hay en las validaciones de los campos
const { validarCampos } = require('../middleware/validar-campos');

const { validarRol, exitEmail, existeUsuarioXId } = require('../helpers/validaciones-db');

//este router nos ayudara a definir todas la rutas para este usuario en este caso
const router = Router();

//Y sencillamente para las rutas en vez de app o this.app, usamos router para definir cada ruta
//Ya creado nuestro controller, se pasa la referencia de la funcion que se crearon para cada ruta.
router.get('/', usuarioGet);
router.post('/',
    [
        //Para validar parametros que vengan en la request, usaremos un pq llamado express-validation (es un middleware), se ejecutara antes de entrar al controlador
        //al check le mandamos el dato del body que queremos revisar, en este caso seria el correo(1parametro),
        //Como segundo parametro seria el mensaje que saltaria si ese dato no es correcto
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        check('password', 'La contraseña debe contener mas de 6 caracteres o digitos').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(exitEmail),
        //Con el isIn preguntamos que si el rol no existe o no es igual a lo que declaramos entonces que salte el error
        //Para declarar o hacer una validacion personalisada es con el (custom)
        check('rol').custom(validarRol),
        //check('rol', 'Rol no valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        //Llamamos a nuestor middleware que saltara el mensaje de error si hubo alguno en las validaciones de arriba
        validarCampos
    ], usuriosPost);
//Para recibir un argumento en la ruta se hace de esta manera /:(y el nombre del parametro a recibir):
//Validamos que el id que manden por parametros es un id de mongo
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioXId),
    check('rol').custom(validarRol),
    validarCampos
], usuariosPut);

//Para eliminar un usuario o archivo, necesitaremos tambien el id
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    //check('id').custom(existeUsuarioXId),
    validarCampos,
], usuriosDelete);



module.exports = router;
