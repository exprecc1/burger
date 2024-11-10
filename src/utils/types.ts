export interface Ingredient {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  uuid?: string;
}

export interface UserState {
  user: {
    name: string;
    email: string;
  } | null;
}

export interface OrderState {
  status: string;
}
