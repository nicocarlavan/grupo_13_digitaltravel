var express = require('express');
var router = express.Router();

//Controller
const productsApiController = require('../../controllers/api/productsApiController');


router.get('/', productsApiController.list);
router.get('/:id', productsApiController.detail);

module.exports = router;