import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    async editUserInfo(user: any){
        return await this.userService.editUserInfo(user);
    }


}
