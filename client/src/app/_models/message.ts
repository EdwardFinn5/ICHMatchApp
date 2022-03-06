export interface Message {
  id: number;
  senderId: number;
  senderUsername: string;
  senderFirstName: string;
  senderCompany: string;
  senderCollege: string;
  senderAppUserType: string;
  studentSenderUrl: string;
  companySenderUrl: string;
  recipientId: number;
  recipientUsername: string;
  recipientFirstName: string;
  recipientCollege: string;
  recipientCompany: string;
  recipientAppUserType: string;
  studentRecipientUrl: string;
  companyRecipientUrl: string;
  content: string;
  dateRead?: Date;
  messageSent: Date;
}
