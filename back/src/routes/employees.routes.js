const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employees.controller');
const { authMiddleware } = require('../middlewares/auth');

router.get('/areas', ctrl.stats);
router.get('/', ctrl.list);
router.get('/:id', ctrl.detail);
router.post('/', authMiddleware, ctrl.create);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);


module.exports = router;
