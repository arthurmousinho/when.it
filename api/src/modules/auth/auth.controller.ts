import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dtos/login-user.dto';
import { SignUpUserDTO } from './dtos/signup-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/login')
    public async login(@Body() data: LoginUserDTO) {
        return await this.authService.login(data);
    }

    @Post('/signup')
    public async signup(@Body() data: SignUpUserDTO) {
        return await this.authService.signUp(data);
    }

}