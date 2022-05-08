const express = require('express');
const router = express.Router();

router.post('/', require('./cardPOST'));
router.get('/', require('./cardGET'));
router.delete('/:cardId', require('./cardDELETE'));

module.exports = router;
