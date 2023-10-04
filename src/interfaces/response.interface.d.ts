export interface ResponseLogin {
  token: string;
  userData: {
    firstName: string;
    lastName: string;
    country: string;
    phoneNumber: string;
    username: string;
  };
}

export interface ResponseCreateUser extends ResponseLogin {
  message: string;
}
