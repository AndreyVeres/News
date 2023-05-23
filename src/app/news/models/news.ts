import { IUser } from 'src/app/core/models/user';

export interface INews {
  id?: number;
  author: Pick<IUser, 'username' | 'avatar'>;
  title: string;
  createdDate: string;
  description: string;
  comments: ICommnet[];
  categories: string[]
}

export interface ICommnet {
  author: Pick<IUser, 'username' | 'avatar'>;
  text: string;
  date: string;
}
