export interface Photo {
  id: number;
  studentUrl: string;
  logoUrl: string;
  description: string;
  dateAdded: Date;
  isMain: boolean;
  isMainLogo: boolean;
  publicId: string;
}
