const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
        name: DataType.STRING,
        email: DataType.STRING,
        password: DataType.VIRTUAL,
        password_hash: DataType.STRING
    },
    {
        hooks: {
            beforeSave: async user => {
                if(user.password) {
                    user.password_hash = bcrypt.hashSync(user.password, 8);
                }
            }
        }
    });

    return User;
};