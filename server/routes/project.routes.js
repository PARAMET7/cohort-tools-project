const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Project routes working!');
});

module.exports = router;
