export class User {
  id!: string;
  name!: string;
  email!: string;
  role!: 'ADMIN' | 'MEMBER';
  provider!: 'google';
}
