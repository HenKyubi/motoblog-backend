export interface FormSignUp {
  firstName: string;
  lastName: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
  username: string;
  password: string;
}

export interface FormLogin {
  username: string
  password: string
  rememberMe: boolean
}