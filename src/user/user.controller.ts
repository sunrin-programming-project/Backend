import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserInput } from './dto/user.dto';
import { Request } from 'express';
import { IOAuthUser } from 'src/auth/interfaces/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @ApiOperation({ summary: '유저 정보 수정' })
    @ApiBadRequestResponse({ description: 'Login first' })
    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    async editUserInfo(@Req() req:Request & IOAuthUser, @Body() user: CreateUserInput){
        if(!req.user.googleId){
            throw new HttpException('Login first', HttpStatus.UNAUTHORIZED);
        }
        
        return await this.userService.editUserInfo(req.user.googleId, user);
    }

    @ApiOperation({ summary: '유저 정보 조회' })
    @Get('all')
    async findAll(){
        return await this.userService.getAllUser();
    }


}
