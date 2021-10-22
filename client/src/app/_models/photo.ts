export interface Photo {
  id: number;
  studentUrl: string;
  logoUrl: string;
  hrUrl: string;
  description: string;
  dateAdded: Date;
  isMain: boolean;
  isMainLogo: boolean;
  isMainHr: boolean;
  publicId: string;
}
