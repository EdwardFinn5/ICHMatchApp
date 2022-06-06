import { CiempLocation } from './ciempLocation';

export interface StempLocation {
  stempLocationId: number;
  stempLocationName: string;
  stempLocationSortName: string;
  ciempLocations: CiempLocation[];
}
