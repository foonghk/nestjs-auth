import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDto } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,       
    ) {}

    @Get("/onlyauth")
    @UseGuards(AuthGuard("jwt"))
    async hiddenInformation(){
        return  "hidden information";
    }
    @Get("/anyone")
    async publicInformation(){
        return  "this can be seen by anyone";
    }

    @Post('register')
    async register(@Body() registerDTO: RegisterDto) {
      const user = await this.userService.create(registerDTO);
      const payload = {     
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }

    @Post('login')
    async login(
      @Body() loginDTO: LoginDto, 
      @Res() response: Response
    ) {
      const user = await this.userService.findByLogin(loginDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      response.cookie('access_token', token, {
          httpOnly: true,
          domain: 'localhost', // your domain here!
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ user, success: true });
     // return { user, token};
    }

}
