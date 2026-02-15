export type UserDto = {
  id: number;
  email: string;
  password: string;
  name: string;
  secondName?: string | null;
};

export type UserWithoutIdDto = Omit<UserDto, 'id'>;
