const express = require('express');
const router = express.Router();

const controller = require('../controllers/movies');

router.get('/',controller.list);

router.patch('/actor',controller.addActor);

router.post('/',controller.create);

router.put('/:id',controller.replace);

router.patch('/:id',controller.update);

router.delete('/:id',controller.destroy);

router.get('/:id',controller.index);








module.exports = router;