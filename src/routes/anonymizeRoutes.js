const express = require('express');
const router = express.Router();
const { anonymize, unanonymize, secureChatGPT } = require('../controllers/anonymizeController');

module.exports = (app) => {
    router.post('/anonymize', anonymize);
    router.post('/unanonymize', unanonymize);
    router.post('/secureChatGPT', secureChatGPT);
    app.use('/', router);
};