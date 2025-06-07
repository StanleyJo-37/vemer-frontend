export interface NotificationType {
  id: number;
  title: string;
  message: string;
  type: "update" | "reminder" | "info";
  activityTitle: string;
  publishedAt: string;
  priority: "low" | "medium" | "high";
};