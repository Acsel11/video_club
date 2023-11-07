const express = require('express');
const router = express.Router();

const controller = require('../controllers/directors');

/* GET users listing. */ 
router.post('/',controller.create);

router.get('/',controller.list);

router.put('/:id',controller.replace);

router.patch('/:id',controller.update);

router.delete('/:id',controller.destroy);

router.get('/:id',controller.index);





module.exports = router;
