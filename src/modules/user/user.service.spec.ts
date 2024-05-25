import { Test, type TestingModule } from '@nestjs/testing';
import { compare } from 'bcrypt';

import { UserAlreadyExistsError } from './errors/user-already-exist-error';
import { InMemorUserService } from './repositories/in-memory/in-memory-user.service';
import { UsersRepository } from './repositories/user-repository';
import { UsersService } from './user.service';

describe('Create User', () => {
  let sut: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useClass: InMemorUserService },
      ],
    }).compile();

    sut = module.get<UsersService>(UsersService);
  });

  it('should be able to create user', async () => {
    const user = await sut.create({
      name: 'John Doe',
      username: 'johnDoe',
      password: '123456',
      role: 'Tecnologia - Analista',
    });

    expect(user.id).toEqual(expect.any(Number));
  });

  it('should hash user password upon creation user', async () => {
    const user = await sut.create({
      name: 'John Doe',
      username: 'johnDoe',
      password: '123456',
      role: 'Tecnologia - Analista',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to create with same username twice', async () => {
    const username = 'johnDoe';

    await sut.create({
      name: 'John Doe',
      username,
      password: '123456',
      role: 'Tecnologia - Analista',
    });

    await expect(
      async () =>
        await sut.create({
          name: 'John Doe',
          username,
          password: '123456',
          role: 'Admin',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

describe('Find User', () => {
  let sut: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useClass: InMemorUserService },
      ],
    }).compile();

    sut = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be able get to user infos', async () => {
    const createdUser = await repository.create({
      name: 'John Doe',
      username: 'johnDoe',
      password: '123456',
      role: {
        connectOrCreate: {
          where: {
            role: 'Analista',
          },
          create: {
            role: 'Analista',
          },
        },
      },
    });

    const user = await sut.findById(createdUser.id);

    expect(user?.username).toEqual('johnDoe');
  });

  it('should not be able to get user infos with wrong id non exists', async () => {
    await expect(
      async (id = 0) => await sut.findById(id),
    ).rejects.toBeInstanceOf(Error);
  });
});

describe('Find All User', () => {
  let sut: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useClass: InMemorUserService },
      ],
    }).compile();

    sut = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be able get to user infos', async () => {
    await repository.create({
      name: 'John Doe',
      username: 'johnDoe',
      password: '123456',
      role: {
        connectOrCreate: {
          where: {
            role: 'Analista',
          },
          create: {
            role: 'Analista',
          },
        },
      },
    });

    await sut.create({
      name: 'John Doe',
      username: 'johnDoe1',
      password: '123456',
      role: 'Analista',
    });

    const getAllUsers = await sut.findAll();

    expect(getAllUsers).toHaveLength(2);
    expect(getAllUsers).toEqual([
      expect.objectContaining({ username: 'johnDoe' }),
      expect.objectContaining({ username: 'johnDoe1' }),
    ]);
  });
});
