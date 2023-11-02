const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

const tipsCtrl = require("../controllers/tips");

// GET /tips
router.get('/', tipsCtrl.index);

// GET /tips/new
router.get('/new', ensureLoggedIn, tipsCtrl.new);

// POST /tips
router.post('/', ensureLoggedIn, tipsCtrl.create);

router.get('/:id', tipsCtrl.show);

// DELETE /tips/:id
router.delete('/tips/:id', ensureLoggedIn, tipsCtrl.delete);


module.exports = router;