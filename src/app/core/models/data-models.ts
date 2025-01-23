export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface User {
  UserId: number;
  Email: string;
  Password: string;
  Role: number;
  RoleName: string;
}
