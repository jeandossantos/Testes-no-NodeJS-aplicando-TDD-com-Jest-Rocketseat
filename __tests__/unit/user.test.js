const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async () => truncate());
    it('should encrypt user password', async () => {
        const user = await User.create({
            name: 'Diego',
            email: 'diego@rocketseat.com',
            password: '123456'
        });

        const isMath = bcrypt.compareSync('123456', user.password_hash);

        expect(isMath).toBe(true);
    });

    
});