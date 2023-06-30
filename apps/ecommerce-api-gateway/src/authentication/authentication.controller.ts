import { UserLoginDTO } from '@app/common/Authentication/DTO/UserLoginDTO';
import { IResponse } from '@app/common/IResponse';
import { Body, Controller, Get, Head, Header, HttpException, HttpStatus, Inject, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '@app/common/Authentication/Responses/login-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterReponse } from '@app/common/Authentication/Responses/register-response';
import { UserRegisterDTO } from '@app/common/Authentication/DTO/UserRegisterDTO';
@ApiTags('Authetication')
@Controller("auth")
@UsePipes(new ValidationPipe())
export class AuthenticationController {
    constructor(@Inject('AUTHENTICATION') private readonly authenticationClient: ClientProxy) { }

    @ApiOkResponse()
    @Post("login")
    async login(@Body() login: UserLoginDTO): Promise<LoginResponse> {
        const request = this.authenticationClient.send({cmd: 'login'}, login);
        const response: IResponse = await firstValueFrom(request);
        if(response.statusCode != HttpStatus.OK) 
        {
            throw new HttpException({
                data: null,
                message: response.message,
                errors: response.errors
            }, response.statusCode);
        }
        return response;
    }

    @Post("/register")
    async register(@Body() register: UserRegisterDTO): Promise<RegisterReponse> {
        const request = this.authenticationClient.send({cmd: 'register'}, register);
        const response: IResponse = await firstValueFrom(request);
        if(response.statusCode != HttpStatus.OK) 
        {
            throw new HttpException({
                data: null,
                message: response.message,
                errors: response.errors
            }, response.statusCode);
        }
        return response;
    }

    @Get("publickey")
    async getPublicKey(): Promise<IResponse> {
        const request = this.authenticationClient.send({cmd: 'publickey'}, "");
        const response: IResponse = await firstValueFrom(request);
        if(response.statusCode != HttpStatus.OK) 
        {
            throw new HttpException({
                data: null,
                message: response.message,
                errors: response.errors
            }, response.statusCode);
        }
        return response;
    }

    @Get('getToken')
    async getToken(@Param('token') token: string ): Promise<IResponse> {
        const request = this.authenticationClient.send({cmd: 'getToken'}, token);
        const response: IResponse = await firstValueFrom(request);
        if(response.statusCode != HttpStatus.OK) {
            throw new HttpException({
                data: null,
                message: response.message
            }, response.statusCode);
        }
        return response;
    }

}
