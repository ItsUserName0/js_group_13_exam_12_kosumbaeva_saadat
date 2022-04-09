export interface User {
  _id: string,
  displayName: string,
}

export interface Image {
  _id: string,
  user: User,
  title: string,
  image: string,
}

export interface ImageData {
  [key: string]: any,

  title: string,
  image: File,
}
