import { Major } from './major';

export interface Category {
  categoryId: number;
  categoryName: string;
  majors: Major[];
}
