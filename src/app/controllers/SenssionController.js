const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ckeckPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

const generateToken = function(id) {
    return jwt.sign({ id: id }, process.env.APP_SECRET);
}

class SessionController {

    async store(req, resp) {
        const { email, password } = req.body;
        
        const user = await User.findOne({ where: { email }});

        if(!user) return resp.status(401).send('User not found.');

        const isMath = ckeckPassword(password, user.password_hash);

       if(!isMath) {
           return resp.status(401).send('incorrect password');
       }
        
        return resp.json({
            user,
            token: generateToken(user.id)
        });
    }

}

module.exports = new SessionController();