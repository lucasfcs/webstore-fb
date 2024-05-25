import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import {
  DataValidation,
  type AuthUser,
  type AuthValidationDTO,
} from './dtos/auth-validation.dto';

@ApiTags('Auth User')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { username, password }: AuthLoginDto,
  ): Promise<AuthValidationDTO> {
    const login = await this.authService.login({ username, password });
    return login;
  }

  @UseGuards(AuthGuard)
  @Post('validation')
  async validation(@Req() req: DataValidation): Promise<AuthUser> {
    const user = req.tokenPayload;
    return user;
  }
}
