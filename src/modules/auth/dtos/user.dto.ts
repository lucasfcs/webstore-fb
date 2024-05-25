export class Header {
  user!: BearerTokenUser;
}

export class BearerTokenUser {
  id!: number;
  name!: string;
  username!: string;
  role!: Role;
  iat!: number;
  exp!: number;
  aud!: string;
  iss!: string;
  sub!: string;
}

export class Role {
  role!: string;
}
