import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgotPasswordDTO } from './dto/auth-forgot-password.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: AuthForgotPasswordDTO) {
    return this.authService.forget(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() { password, token }: AuthResetPasswordDTO) {
    return this.authService.reset(password, token);
  }

  @Post('check-token')
  async checkToken(@Body() { token }: { token: string }) {
    return this.authService.checkToken(token);
  }
}
