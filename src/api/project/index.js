const express = require('express');
const router = express.Router();

router.post('/', require('./projectPOST'));
// router.get('/:projectId', require('./projectGET'));

module.exports = router;
