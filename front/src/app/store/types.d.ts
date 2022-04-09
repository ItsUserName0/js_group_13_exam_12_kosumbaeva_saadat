import { LoginError, RegisterError, User } from '../models/user.model';
import { Image } from '../models/image.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoginLoading: boolean,
};

export type ImagesState = {
  items: Image[],
  fetchLoading: boolean,
  createLoading: boolean,
  createError: null | string,
}

export type AppState = {
  users: UsersState,
  images: ImagesState,
};
