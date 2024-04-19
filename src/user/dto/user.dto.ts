import { ApiProperty } from "@nestjs/swagger";

export class CreateUserInput {
    @ApiProperty({
        example: 'email',
        description: '이메일',
    })
    email: string;

    @ApiProperty({
        example: 'name',
        description: '이름',
    })
    name: string;

    @ApiProperty({
        example: 'email_recieve',
        description: '이메일 수신 여부',
    })
    email_recieve: boolean;

    @ApiProperty({
        example: 'field',
        description: '분야',
    })
    field: string;
}