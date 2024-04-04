import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgotPasswordDTO } from './dto/auth-forgot-password.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'node:path';
import { UserService } from 'src/user/user.service';
import { FileService } from 'src/file/file.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Post('check-token')
  async checkToken(@User(`id`) user) {
    return {
      user,
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(@User() user, @UploadedFile() photo: Express.Multer.File) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      `photo-${user.id}.png`,
    );

    try {
      this.fileService.upload(photo, path);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return {
      success: true,
    };
  }
}
