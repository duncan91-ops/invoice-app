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