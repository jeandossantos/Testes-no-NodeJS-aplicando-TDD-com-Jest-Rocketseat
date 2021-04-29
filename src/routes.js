const { Router } = require('express');

const SessionController = require('./app/controllers/SenssionController');
const authMiddleware = require('./app/middlewares/authMiddlewares');

const router = Router();

router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/dashboard', (req, resp) => resp.send());

module.exports = router;