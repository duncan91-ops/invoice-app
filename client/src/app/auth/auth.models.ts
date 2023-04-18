export interface IToken {
  access: string;
  refresh: string;
}

export interface IRegisterData {
  first_name: string;
  last_name: string;
  email: string;
}

export interface IRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IActivate {
  uid: string;
  token: string;
}

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: string;
  phone_number: string;
  profile_photo: {
    small: string;
    medium: string;
    large: string;
  };
  country: string;
  city: string;
  street: string;
  post_code: string;
  admin?: boolean;
}