export interface User {
  userID: string;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}