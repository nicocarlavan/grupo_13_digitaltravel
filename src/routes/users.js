var express = require('express');
var router = express.Router();

//Controller
const usersController = require('../controllers/usersController');


//Middlewares
const upload = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validationMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');




router.get('/login', guestMiddleware, usersController.login);

router.post('/login', usersController.loginProcess);

router.get('/profile', authMiddleware, usersController.profile);

router.get('/register', guestMiddleware, usersController.registro);

router.post('/register', upload.single('image'), validations, usersController.newUser);

router.get('/admin', adminAuthMiddleware, usersController.admin);

router.post('/admin', adminAuthMiddleware, usersController.userRole);

//prueba db
router.get('/admin/users', adminAuthMiddleware, usersController.userAdmin);

router.get('/logout', usersController.logout);


module.exports = router;