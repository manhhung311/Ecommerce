import { UserLoginDTO } from '@app/common/Authentication/UserLoginDTO';
import { IResponse } from '@app/common/Authentication/Responses/IResponse';
import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '@app/common/Authentication/Responses/login-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterReponse } from '@app/common/Authentication/Responses/register-response';
import { UserRegisterDTO } from '@app/common/Authentication/UserRegisterDTO';
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

}
