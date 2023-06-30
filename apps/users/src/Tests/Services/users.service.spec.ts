import { Test, TestingModule } from '@nestjs/testing';
import { UserResponse } from '@app/common/Users/Responses/user.response';
import { IResponse } from '@app/common/IResponse';
import { UsersService } from '../../Services/users.service';
import { UserRepository } from '../../Repositories/UserRepository';

describe('UsersService', () => {
    let usersService: UsersService;
    const mockUsersRepository = {
        getAll: jest.fn((): UserResponse[] => {
            return [
                {
                    statusCode: 200, message: 'success',
                    data: {
                        users: {
                            id: 1,
                            email: 'a@gmail.com',
                            phoneNumber: '+841234454',
                            activated: true,
                        }
                    },
                    errors: null
                },

            ];
        }),

        getById: jest.fn((id: number): UserResponse => {
            return {
                statusCode: 200, message: 'success',
                data: {
                    users: {
                        id: id,
                        email: 'a@gmail.com',
                        phoneNumber: '+841234454',
                        activated: true,
                    }
                },
                errors: null
            };
        }),

        deleteById: jest.fn((id: number): IResponse=> {
            return {
                statusCode: 200,
                message: 'OK', 
                data: null, 
                errors: null
            }
        }), 

        updateById: jest.fn((id: number, dto): IResponse=> {
            return {
                statusCode: 200,
                message: 'OK', 
                data: {
                    user: {
                        id: id, 
                        ...dto
                    }
                },
                errors: null
            }
        })
    }
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).overrideProvider(UserRepository).useValue(mockUsersRepository).compile();
        usersService = app.get<UsersService>(UsersService);

    });

    describe('users', () => {
        describe('case false', () => {

            it('get user by id', () => {
                expect(usersService.findById()).toThrow('cannot find user by id');
            });


            it('create account', () => {
                expect(usersService.create()).toThrow('user conflict');
            });

            it('update account', () => {
                expect(usersService.update()).toThrow('email conflig');
            });

            it('delete account by id', () => {
                expect(usersService.destroy()).toThrow('canot find user by id');
            });
        });

        describe('case true', () => {
            it('getAll', () => {
                expect(usersService.getAll()).toContainEqual({

                });
            });

            it('get user by id', () => {

            })
        })
    });

});
