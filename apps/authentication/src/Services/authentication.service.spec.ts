import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../authentication.service';
import { UserRepository } from '../Repositories/UserRepository';
import { Mock } from 'ts-mockery'
import { Users } from '../Models/Users.entity';
describe('AuthenticationController', () => {
  let authenticationService: AuthenticationService;
  let userRepository: UserRepository;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile();
    let token = '12345678';
    authenticationService = app.get<AuthenticationService>(AuthenticationService);
    userRepository = Mock.of<UserRepository> ({
        login: (username: string, password: string)=> {return Promise.resolve(Users)},
        create: (username: string, password: string, email: string)=> {return Promise.resolve(Users)},
        findByUserName: (username: string)=> {return Promise.resolve(Users)},
        findByEmail: (email: string)=>  {return Promise.resolve(Users)}, 
        findByUserNameOrEmail: (username: string, email: string)=> {return Promise.resolve(Users)},
        
    });
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(authenticationController.getHello()).toBe('Hello World!');
    });
  });

  describe('auth', () => {
    it('login', () => {
      expect(authenticationService
        .login({ username: 'manhhung311', password: 'ManhHung311' })).toContainEqual({
          statusCode: 200,
          message: "login success",
          data: {
            user: {
              id: 1,
              email: 'vumanhhung311@gmail.com',
              token: expect.any(String)
            }, token: expect.any(String)
          },
          errors: null
        });
    });
  });

});
