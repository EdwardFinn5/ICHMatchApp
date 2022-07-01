import { PhotoNews } from './photoNews';

export interface News {
  newsId: number;
  newsTitle: string;
  newsContent: string;
  order: number;
  isActive: boolean;
  newsUrl: string;
  photoNewes: PhotoNews[];
}
