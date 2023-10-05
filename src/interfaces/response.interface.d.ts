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

export interface ResponseBase {
  message: string;
}

export interface ResponseCreatePost extends ResponseBase {}

export interface ResponseCreateComment extends ResponseBase {}

export interface ResponseGetUserByUsername {
  userData: {
    firstName: string;
    lastName: string;
    country: string;
    username: string;
    photo?: string;
  };
}
