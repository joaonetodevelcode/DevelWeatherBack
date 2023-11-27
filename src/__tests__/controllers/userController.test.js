import UserController from "../../controllers/userController";
import User from "../../models/User";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe("../../controllers/userController", () => {

    beforeEach(async () => {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
    });

    afterEach(async () => {
        await mongoose.connection.close();
    });

    describe("userLogin Function", () => {

        const mockUser = {
          name: 'Test User',
          email: 'test@test.com',
          password: 'password123',
        };

        beforeEach(async () => {
          await User.create(mockUser);
        })

        afterEach(async() => {
          await User.deleteOne({ email: mockUser.email });
        })

        it('Should log in when entering the correct email and password', async () => {
      
            const req = {
              body: {
                email: mockUser.email,
                password: mockUser.password,
              },
            };
      
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
      
            await UserController.userLogin(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Usuario encontrado', user: expect.any(Object) });
          });
    
    });
});