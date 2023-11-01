const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /tips/:id/comments (create comment for a tip)
router.post('/tips/:id/comments', ensureLoggedIn, commentsCtrl.create);
// DELETE /comments
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);

module.exports = router;