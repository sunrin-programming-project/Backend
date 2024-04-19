import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserInput } from './dto/user.dto';
import { Request } from 'express';
import { IOAuthUser } from 'src/auth/interfaces/user.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @ApiOperation({ summary: '유저 정보 수정' })
    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    async editUserInfo(@Req() req:Request & IOAuthUser, @Body() user: CreateUserInput){
        if(!req.user.googleId){
            throw new HttpException('Login first', HttpStatus.UNAUTHORIZED);
        }
        
        return await this.userService.editUserInfo(req.user.googleId, user);
    }


}
