import { EmpInfo } from './empInfo';
import { Photo } from './photo';
import { PhotoHr } from './photoHr';
import { Position } from './position';
import { StudInfo } from './studinfo';

export interface Member {
  appUserId: number;
  username: string;
  studentUrl: string;
  logoUrl: string;
  hrUrl: string;
  firstName: string;
  lastName: string;
  appUserType: string;
  isActive: boolean;
  ciLocation: string;
  ciempLocation: string;
  coLocation: string;
  stLocation: string;
  stempLocation: string;
  uniqueTitle: string;
  uniqueContent: string;
  registerCode: string;
  icfNote: string;
  classYear: string;
  major: string;
  category: string;
  college: string;
  gpa: string;
  gradDate: Date;
  bestEmail?: string;
  bestPhone?: string;
  athletics: string;
  arts: string;
  extraCurricular: string;
  academicPlus: string;
  workPlus: string;
  dreamJob: string;
  empName: string;
  empIndustry: string;
  employeeNum: string;
  givingLevel: string;
  giftAmt: number;
  empWebsite: string;
  companyDescription: string;
  whyWork: string;
  positionName: string;
  positionIdentifier: string;
  positionDescription: string;
  // lookingFor: string;
  positionBenefits: string;
  positionType: string;
  positionLocation: string;
  dateAdded: Date;
  startDate: Date;
  appDeadline: Date;
  hrContact: string;
  hrContactTitle: string;
  howToApply: string;
  applyEmail: string;
  applyLink: string;
  created: Date;
  lastActive: Date;
  photos: Photo[];
  photoHrs: PhotoHr[];
  positions: Position[];
  studInfos: StudInfo[];
  empInfos: EmpInfo[];
}
