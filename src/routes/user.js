const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet } = require('../controllers/user');


const router = Router();

router.get('/',  usuariosGet);



module.exports = router;
