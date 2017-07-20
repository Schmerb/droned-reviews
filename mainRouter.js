const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

// parser for requests
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.sendFile('./public/index.html');
});

module.exports = router;