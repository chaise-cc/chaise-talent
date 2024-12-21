export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: number) => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}
