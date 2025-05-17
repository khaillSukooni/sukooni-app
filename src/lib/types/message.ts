
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  senderName?: string;
  senderRole?: string;
  senderAvatar?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar?: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
}
