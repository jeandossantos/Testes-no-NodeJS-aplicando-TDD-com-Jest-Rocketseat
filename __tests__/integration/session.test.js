const request = require('supertest');
const { User } = require('../../src/app/models');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');
const jwt = require('jsonwebtoken');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const generateToken = function(id) {
    return jwt.sign({ id: id }, process.env.APP_SECRET);
}

describe('authenticate', () => {
    beforeEach(async () => await truncate());
    it('should authenticate with valid credentials', async () => {
        
        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            });

        expect(response.status).toBe(200);
    });

    it('should not authenticated with invalid credentials', async () => {
        
        const user = await factory.create('User', {});

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '12345'
            });
        
        expect(response.status).toBe(401);
    });

    it('should return JWT when autheticated', async () => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            });
        
        expect(response.body).toHaveProperty("token");
    });

    it('should be able to acess private routes when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const token = generateToken(user.id);

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
    });

    it('should not be to acess private routes without jwt token', async () => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .get('/dashboard')
        
        expect(response.status).toBe(401);
    });

    it('should not be to acess private routes with invalid jwt token', async () => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', 'Bearer 123456');
        
        expect(response.status).toBe(401);
    })
});