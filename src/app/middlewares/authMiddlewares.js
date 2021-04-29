const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, resp, next) => {
    const authToken = req.headers.authorization;

    if(!authToken) {
        return resp.status(401).send('Token not provided');
    }

    
    try {
        const [, token] = authToken.split(' ');

        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

        req.userId = decoded.id;        
    } catch (error) {
        return resp.status(401).send('Invalid token');
    }

    next();
}