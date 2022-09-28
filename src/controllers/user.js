const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {

    //const query = req.query;
  //  const {q, nombre='no name', page = 1,limit} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    // const query = {estado:true};
/*
    const usuarios = await Usuario.find({ query })
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
*/
    const [total, usuarios] = await Promise.all([

        // User.countDocuments(query),
        User.find( )
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}

// const usuariosPut = async(req = request, res) => {

//     const {id} = req.params;
//     console.log(id);
//     const { _id, password, google, correo, ...resto} = req.body;

//     if (password) {
//         const salt = bcryptjs.genSaltSync(10);
//         resto.password = bcryptjs.hashSync(password, salt);
//     }

//     const usuario = await Usuario.findByIdAndUpdate(id,resto, {new:true});

//     res.json({
//         msg: 'put API - controlador',
//         usuario
//     });
// }


// const usuariosPost = async(req, res) => {


//     const {nombre, correo, password, rol} = req.body;
//     const usuario = new Usuario({nombre, correo, password, rol});

//     // Encriptar la contraseña
//     const salt = bcryptjs.genSaltSync(10);
//     usuario.password = bcryptjs.hashSync(password, salt);

//     //Guardar em BD
//     await usuario.save();

//     //const {nombre,edad} = req.body;
//     res.json({
//         usuario
//     });
// }


// const usuariosDelete = async(req = request, res=response) => {

//     const {id} = req.params;
//    // const uid = req.uid;
//     //fisicamente lo borramos
//     //const usuario = await Usuario.findByIdAndDelete(id);
//     //Se mantiene el usuario en la bd pero borrado al cambiarle el estado a falso-recomendando

//     const usuario = await Usuario.findByIdAndUpdate(id, {estado:false},{new:true})
//    // const usuarioAutencado = req.usuario;
//     res.json( usuario);
//    // res.json({ usuario,usuarioAutencado} );

// }


// const usuariosPatch = (req, res) => {


//     res.json({
//         msg: 'patch API - controlador'
//     });
// }


module.exports = {
    usuariosGet,
    // usuariosPut, usuariosPost, usuariosDelete, usuariosPatch
}