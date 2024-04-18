import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserInput } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @ApiOperation({ summary: '유저 정보 수정' })
    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    async editUserInfo(@Body() user: CreateUserInput){
        return await this.userService.editUserInfo(user);
    }


}
