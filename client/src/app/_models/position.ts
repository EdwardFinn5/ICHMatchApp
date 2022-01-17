export interface Position {
  positionId: number;
  positionIdentifier: string;
  empName: string;
  empIndustry: string;
  positionName: string;
  positionDescription: string;
  positionBenefits: string;
  lookingFor: string;
  positionType: string;
  positionLocation: string;
  dateAdded: Date;
  startDate: Date;
  appDeadline: Date;
  active: boolean;
  hrContact: string;
  hrContactTitle: string;
  howToApply: string;
  applyEmail: string;
  applyLink: string;
  logoUrl: string;
  isMainLogo: string;
  appUserId: number;
}
