var express = require('express');
var router = express.Router();

//Controller
const usersApiController = require('../../controllers/api/usersApiController');


router.get('/', usersApiController.list);
router.get('/:id', usersApiController.detail);

module.exports = router;