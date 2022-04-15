import { PositName } from './positName';

export interface PosCategory {
  posCategoryId: number;
  posCategoryName: string;
  positNames: PositName[];
}
