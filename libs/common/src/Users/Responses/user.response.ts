import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { IResponse } from "@app/common/IResponse";

export class UserResponse implements IResponse {
    @ApiProperty({
        example: 200,
        description: "status code"
    })
    statusCode: number;

    @ApiProperty({ example: 'success' })
    message: string;

    @ApiProperty({
        example: {
            data: {
                users: { id: 1, email: "a@gmail.com", phoneNumber: "+841234444", activated: true }
            }
        },
    })
    data: {
        users: {
            id: number,
            email: string,
            phoneNumber: string,
            activated: boolean
        };
    };

    @ApiProperty({ example: null, nullable: true })
    errors: {
        [key: string]: any
    };

}