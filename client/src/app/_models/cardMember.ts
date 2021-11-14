import { EmpInfo } from './empInfo';
import { Photo } from './photo';
import { Position } from './position';
import { StudInfo } from './studinfo';

export interface CardMember {
  appUserId: number;
  username: string;
  studentUrl: string;
  logoUrl: string;
  hrUrl: string;
  arts: string;
  firstName: string;
  lastName: string;
  appUserType: string;
  active: boolean;
  location: string;
  classYear: string;
  major: string;
  college: string;
  givingLevel: string;
  giftAmt: number;
  empName: string;
  empIndustry: string;
  employeeNum: string;
  created: Date;
  lastActive: Date;
  photos: Photo[];
  positions: Position[];
  studInfos: StudInfo[];
  empInfos: EmpInfo[];
}
