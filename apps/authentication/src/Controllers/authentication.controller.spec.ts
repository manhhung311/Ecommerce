import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../authentication.service';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    authenticationController = app.get<AuthenticationController>(AuthenticationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(authenticationController.getHello()).toBe('Hello World!');
    });
  });

  describe('auth', () => {
    it('login', () => {
      expect(authenticationController.login({username: 'manhhung311', password: 'ManhHung311'})).toContainEqual({
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
