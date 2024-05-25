import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { type User } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { Create } from './dtos/response/create-user-response';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserAlreadyExistsError } from './errors/user-already-exist-error';
import { UserDoesNotExist } from './errors/user-does-not-exist';
import { UsersService } from './user.service';

@ApiTags('User')
// @ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Create a new user.',
    description: 'Create user on the GSM.',
  })
  @ApiCreatedResponse({
    type: Create,
  })
  @ApiConflictResponse({
    description: 'Conflict',
    type: UserAlreadyExistsError,
  })
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    try {
      await this.usersService.create(createUserDto);

      return { message: 'Usuário criado com sucesso!' };
    } catch (err) {
      throw new UserAlreadyExistsError();
    }
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Find all users.',
    description: 'Find all users on the GSM.',
  })
  @ApiOkResponse({
    type: Promise<User[] | null>,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @Get()
  async findAll(): Promise<User[] | null> {
    const getAllUsers = await this.usersService.findAll();

    return getAllUsers;
  }

  @ApiOperation({
    summary: 'Find all roles.',
    description: 'Find all roles on the GSM.',
  })
  @ApiOkResponse({
    type: Promise<string[] | null>,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @Get('get-all-roles')
  async findAllRoles(): Promise<string[] | null> {
    const roles = await this.usersService.findAllRoles();

    return roles;
  }

  @ApiOperation({
    summary: 'Find one user.',
    description: 'Find one user on the GSM.',
  })
  @ApiOkResponse({
    type: Promise<User | null>,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    const user = await this.usersService.findById(+id);

    return user;
  }

  @ApiOperation({
    summary: 'Update user information.',
    description: 'Update user information on the GSM.',
  })
  @ApiOkResponse({
    type: Promise<{ message: string }>,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UserDoesNotExist,
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    try {
      await this.usersService.updateUser(+id, updateUserDto);

      return { message: 'Dados do usuário atualizado com sucesso!' };
    } catch (error) {
      throw new UserDoesNotExist();
    }
  }

  @ApiOperation({
    summary: 'Delete user.',
    description: 'Delete user information on the GSM.',
  })
  @ApiOkResponse({
    type: Promise<{ message: string }>,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UserDoesNotExist,
  })
  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.usersService.softDelete(+id);

      return { message: 'Usuário deletado com sucesso!' };
    } catch (error) {
      throw new UserDoesNotExist();
    }
  }
}
