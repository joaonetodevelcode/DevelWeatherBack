
import request from 'supertest';
import express from 'express';
import routes from '../../routes';  

const app = express();
routes(app);

describe('Test main route', () => {
  it('Should get main route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Servidor DevelWeather');
  });

});