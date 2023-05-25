import { IUser } from "@app/common/Authentication/IUser.interface";
import { IResponse } from "./IResponse";
import {ApiProperty} from "@nestjs/swagger";

export class ActivatedReponse implements IResponse {
    @ApiProperty({example: 201})
    statusCode: number;

    @ApiProperty({example: 'user login success'})
    message: string;

    @ApiProperty({
        example: {
            user: {
                email: '',
                id: ''
            }
        },
        nullable: true
    })
    data: {
        user: IUser,
        token: object
    };

    @ApiProperty({example: null, nullable: true})
    errors: {
        [key: string]: any
    };

}