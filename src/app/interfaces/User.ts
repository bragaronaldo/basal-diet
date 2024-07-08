export interface UserDTO {
  token?: string;
  user: {
    id: number;
    username?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
  };
}
export interface UserAuth {
  email?: string;
  username: string;
  password: string;
}
