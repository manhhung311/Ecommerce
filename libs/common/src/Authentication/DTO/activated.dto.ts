import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, MinLength } from "class-validator";

export class ActivatedDTO {
    @ApiProperty({
        example: '',
        description: 'asaa'
    })
    @IsNotEmpty()
    token: string;
}