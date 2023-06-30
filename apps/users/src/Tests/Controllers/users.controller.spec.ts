import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../Services/users.service';
import { UsersController } from '../../Controllers/users.controller';
import { UserResponse } from '@app/common/Users/Responses/user.response';
import { IResponse } from '@app/common/IResponse';

describe('UsersController', () => {
    let usersController: UsersController;
    const mockUsersService = {
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

        deleteById: jest.fn((id: number): IResponse => {
            return {
                statusCode: 200,
                message: 'OK',
                data: null,
                errors: null
            }
        }),

        updateById: jest.fn((id: number, dto): IResponse => {
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
            controllers: [UsersController],
            providers: [UsersService],
        }).overrideProvider(UsersService).useValue(mockUsersService).compile();
        usersController = app.get<UsersController>(UsersController);

    });

    describe('users', () => {
        describe('case false', () => {

            it('get user by id', () => {
                expect(usersController.findById(id)).toThrow('cannot find user by id');
            });


            it('create account', () => {
                expect(usersController.create()).toThrow('user conflict');
            });

            it('update account', () => {
                expect(usersController.update()).toThrow('email conflig');
            });

            it('delete account by id', () => {
                expect(usersController.destroy()).toThrow('canot find user by id');
            });
        });

        describe('case true', () => {
            it('getAll', () => {
                expect(usersController.getAll()).toEqual(
                    [{
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
                    }
                    ]
                );
            });

            it('get user by id', () => {
                expect(usersController.findById(1)).toEqual({
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
                });
            });

            it('delete user', () => {
                expect(usersController.deleteById(1)).toEqual({
                    statusCode: 200,
                    message: 'OK',
                    data: null,
                    errors: null
                })
            })

        })
    });

});
