export interface Position {
  positionId: number;
  positionName: string;
  positionDescription: string;
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
}
