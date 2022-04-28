import { StLocation } from './stLocation';

export interface CoLocation {
  coLocationId: number;
  coLocationName: string;
  coLocationSortName: string;
  stLocations: StLocation[];
}
