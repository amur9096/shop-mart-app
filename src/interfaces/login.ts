export interface SuccessLoginResponse {
  message: string;
  user: UserResponse;
  token: string;
}

export interface ErrorLoginResponse {
  message: string;
  statusMsg: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}
