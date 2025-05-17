
import { Message } from "../types/message";
import { mockConversations } from "./mockConversations";
import { mockMessagesByConversation } from "./mockMessagesByConversation";

// Re-export the mock conversations data
export { mockConversations } from "./mockConversations";
export { mockMessagesByConversation } from "./mockMessagesByConversation";

// Helper function to get messages for a specific conversation
export const getMessagesForConversation = (conversationId: string): Message[] => {
  return mockMessagesByConversation[conversationId as keyof typeof mockMessagesByConversation] || [];
};
