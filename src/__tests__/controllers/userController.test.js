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
        jest.restoreAllMocks()
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

          it('Should not log in when entering the incorrect email or password', async () => {
      
            const req = {
              body: {
                email: "email@email.com",
                password: mockUser.password,
              },
            };
      
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
      
            await UserController.userLogin(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({message: 'Usuario não encontrado'});
          });

          it('Should handle userLogin error', async () => {
            const req = {
              body: {},
            };
          
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
          
            jest.spyOn(User, 'findOne').mockImplementation(() => {
              throw new Error('Simulated error');
            });
          
            await UserController.userLogin(req, res);
          
            expect(res.status).toHaveBeenCalledWith(500);
          });
    
    });

    describe("listUsers Function", () => {

      it('Should return a list of users', async () => {
          const req = {};

          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          await UserController.listUsers(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
      });

      it('Should not return a list of users', async () => {
        const req = {};

        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        jest.spyOn(User, 'find').mockImplementation(() => {
          throw new Error('error');
        });
  
        await UserController.listUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
      });
  });

  describe("userRegister Function", () => {

    const mockUser = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    };

    it('Should register a user', async () => {
  
        const req = {
          body: {
            name: mockUser.name,
            email: mockUser.email,
            password: mockUser.password,
          },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        await UserController.userRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        await User.deleteOne({ email: mockUser.email });
      });

      it('Should not register a user', async () => {
        const req = {
          body: {},
        };
      
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        await UserController.userRegister(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
      });

      describe("userUpdate Function", () => {

        const mockUser = {
          name: 'Test User',
          email: 'test@test.com',
          password: 'password123',
        };

        const mockUser2 = {
          name: 'Test User 2',
          email: 'test2@test2.com',
          password: 'password1234',
        };

        beforeEach(async () => {
          await User.create(mockUser);
        })

        afterEach(async() => {
          await User.deleteOne({ email: mockUser.email });
        })

        it('Should update a user', async () => {
            const user =  await User.findOne({ email: mockUser.email})
            const userId = user._id

            const req = {
              params: {id: userId},
              body: mockUser2,
            };
      
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
      
            await UserController.userUpdate(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({message: "Usuario atualizado com sucesso"});
          });
      });
  });
});