import { ApiProperty } from "@nestjs/swagger";

export class CreateUserInput {
    @ApiProperty({
        example: 'googleId',
        description: '구글 아이디',
    })
    googleId: string;

    @ApiProperty({
        example: 'email',
        description: '이메일',
    })
    email: string;

    @ApiProperty({
        example: 'password',
        description: '비밀번호',
    })
    password: string;

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
    field: string;

    @ApiProperty({
        example: 'refresh_token',
        description: '리프레시 토큰',
    })
    refresh_token: string;
}