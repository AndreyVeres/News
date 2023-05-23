export interface IUser {
  id?: number;
  password: string,
  username: string;
  email: string;
  subscription?: USER_SUBSCRIPTIONS;
  avatar?: string;
}

export interface ISubscription {
  price: number;
  rating: number;
  name: string;
  benefits: string[];
}

export enum USER_SUBSCRIPTIONS {
  STANDART = 'standart',
  DELUXE = 'deluxe',
  ULTIMATE = 'ultimate'
}
