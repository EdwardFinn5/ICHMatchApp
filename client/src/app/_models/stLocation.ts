import { CiLocation } from './ciLocation';

export interface StLocation {
  stLocationId: number;
  stLocationName: string;
  stLocationSortName: string;
  ciLocations: CiLocation[];
}
