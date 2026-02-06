export class NotificationResponseDto {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: Date;
  actor?: {
    id: string;
    name: string;
    image: string;
  };
}
