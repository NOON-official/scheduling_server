const express = require('express');
const router = express.Router();

router.post('/', require('./cardPOST'));
router.get('/', require('./cardGET'));
router.put('/:cardId', require('./cardPUT'));
router.delete('/:cardId', require('./cardDELETE'));

module.exports = router;
