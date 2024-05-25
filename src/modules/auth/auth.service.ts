import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { type AuthLoginDto } from './dtos/auth-login.dto';
import { type AuthRegisterDTO } from './dtos/auth-register.dto';
import { type AuthValidationDTO } from './dtos/auth-validation.dto';
import { AuthRepository } from './repositories/auth-repository';

@Injectable()
export class AuthService {
  private readonly issuer = 'loja-fb';
  private readonly audience = 'users';
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: AuthRegisterDTO): ReturnType<any> {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role?.role,
        },
        {
          expiresIn: '2 day',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string): ReturnType<any> {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException({ e });
    }
  }

  async login({
    username,
    password,
  }: AuthLoginDto): Promise<AuthValidationDTO> {
    const findOneUser = await this.authRepository.findByUsername(username);

    if (!findOneUser) {
      throw new UnauthorizedException('Nome de usuário e/ou senha incorretos.');
    }

    if (findOneUser.active === false) {
      throw new UnauthorizedException('O usuário está inativo.');
    }

    if (!(await bcrypt.compare(password, findOneUser.password))) {
      throw new UnauthorizedException('Nome de usuário e/ou senha incorretos.');
    }

    const token = this.createToken(findOneUser);

    return { token };
  }

  async reset(password: string, token: string): Promise<any> {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido.');
      }

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      const user = await this.authRepository.updatePassword(password, data.id);

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
