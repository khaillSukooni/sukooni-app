
import { Conversation, Message } from "../types/message";
import { addDays, subDays, subHours, subMinutes } from "date-fns";

// Get a deterministic date for "today" to use as reference for mock data
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participantId: "therapist-1",
    participantName: "Dr. Sarah Johnson",
    participantRole: "therapist",
    participantAvatar: undefined,
    lastMessage: "I'll see you at our next session on Thursday.",
    lastMessageTimestamp: subHours(now, 2).toISOString(),
    unreadCount: 0,
  },
  {
    id: "conv-2",
    participantId: "therapist-2",
    participantName: "Dr. Michael Chen",
    participantRole: "therapist",
    participantAvatar: undefined,
    lastMessage: "Have you completed the exercises we discussed?",
    lastMessageTimestamp: subDays(now, 1).toISOString(),
    unreadCount: 2,
  },
  {
    id: "conv-3",
    participantId: "admin-1",
    participantName: "Admin Support",
    participantRole: "admin",
    participantAvatar: undefined,
    lastMessage: "Your insurance information has been updated.",
    lastMessageTimestamp: subDays(now, 3).toISOString(),
    unreadCount: 0,
  },
  {
    id: "conv-4",
    participantId: "therapist-3",
    participantName: "Dr. Emily Rodriguez",
    participantRole: "therapist",
    participantAvatar: undefined,
    lastMessage: "Looking forward to our initial consultation.",
    lastMessageTimestamp: subDays(now, 5).toISOString(),
    unreadCount: 0,
  }
];

// Conversation 1 messages
const conversation1Messages: Message[] = [
  {
    id: "msg-1-1",
    senderId: "therapist-1",
    recipientId: "client-1",
    content: "Hello! I'm Dr. Sarah Johnson. I'll be your therapist moving forward. How are you feeling today?",
    timestamp: subDays(now, 7).toISOString(),
    read: true,
    senderName: "Dr. Sarah Johnson",
    senderRole: "therapist",
  },
  {
    id: "msg-1-2",
    senderId: "client-1",
    recipientId: "therapist-1",
    content: "Hi Dr. Johnson, I'm feeling a bit anxious about work, but otherwise okay.",
    timestamp: subDays(now, 7).toISOString(),
    read: true,
  },
  {
    id: "msg-1-3",
    senderId: "therapist-1",
    recipientId: "client-1",
    content: "I understand. We can discuss some anxiety management techniques during our session. Would Thursday at 3pm work for you?",
    timestamp: subDays(now, 6).toISOString(),
    read: true,
    senderName: "Dr. Sarah Johnson",
    senderRole: "therapist",
  },
  {
    id: "msg-1-4",
    senderId: "client-1",
    recipientId: "therapist-1",
    content: "Yes, Thursday at 3pm works perfectly for me. Thank you!",
    timestamp: subDays(now, 6).toISOString(),
    read: true,
  },
  {
    id: "msg-1-5",
    senderId: "therapist-1",
    recipientId: "client-1",
    content: "Great! I've scheduled our appointment. In the meantime, try to practice deep breathing when you feel anxious - breathe in for 4 counts, hold for 2, and exhale for 6.",
    timestamp: subDays(now, 5).toISOString(),
    read: true,
    senderName: "Dr. Sarah Johnson",
    senderRole: "therapist",
  },
  {
    id: "msg-1-6",
    senderId: "client-1",
    recipientId: "therapist-1",
    content: "I'll try that. Thanks for the advice!",
    timestamp: subDays(now, 5).toISOString(),
    read: true,
  },
  {
    id: "msg-1-7",
    senderId: "therapist-1",
    recipientId: "client-1",
    content: "I'll see you at our next session on Thursday.",
    timestamp: subHours(now, 2).toISOString(),
    read: true,
    senderName: "Dr. Sarah Johnson",
    senderRole: "therapist",
  },
];

// Conversation 2 messages
const conversation2Messages: Message[] = [
  {
    id: "msg-2-1",
    senderId: "therapist-2",
    recipientId: "client-1",
    content: "Good morning! I hope you're doing well. I wanted to follow up on the mindfulness exercises we discussed in our last session.",
    timestamp: subDays(now, 4).toISOString(),
    read: true,
    senderName: "Dr. Michael Chen",
    senderRole: "therapist",
  },
  {
    id: "msg-2-2",
    senderId: "client-1",
    recipientId: "therapist-2",
    content: "Good morning Dr. Chen. I've been practicing the body scan meditation every evening before bed. It's been helping me fall asleep more easily.",
    timestamp: subDays(now, 4).toISOString(),
    read: true,
  },
  {
    id: "msg-2-3",
    senderId: "therapist-2",
    recipientId: "client-1",
    content: "That's excellent! Consistent practice is key. Have you noticed any difference in your anxiety levels during the day?",
    timestamp: subDays(now, 3).toISOString(),
    read: true,
    senderName: "Dr. Michael Chen",
    senderRole: "therapist",
  },
  {
    id: "msg-2-4",
    senderId: "client-1",
    recipientId: "therapist-2",
    content: "I think they've improved slightly. I still get anxious in meetings, but the breathing techniques help me calm down faster.",
    timestamp: subDays(now, 3).toISOString(),
    read: true,
  },
  {
    id: "msg-2-5",
    senderId: "therapist-2",
    recipientId: "client-1",
    content: "That's progress! I'd like you to try adding a short 5-minute meditation to your morning routine as well. We can discuss the results in our next session.",
    timestamp: subDays(now, 2).toISOString(),
    read: true,
    senderName: "Dr. Michael Chen", 
    senderRole: "therapist",
  },
  {
    id: "msg-2-6",
    senderId: "therapist-2",
    recipientId: "client-1",
    content: "Have you completed the exercises we discussed?",
    timestamp: subDays(now, 1).toISOString(),
    read: false,
    senderName: "Dr. Michael Chen",
    senderRole: "therapist",
  },
  {
    id: "msg-2-7",
    senderId: "therapist-2",
    recipientId: "client-1",
    content: "Just checking in to see how you're doing with the morning meditation practice. Let me know if you need any guidance.",
    timestamp: subHours(now, 3).toISOString(),
    read: false,
    senderName: "Dr. Michael Chen",
    senderRole: "therapist",
  },
];

// Conversation 3 messages
const conversation3Messages: Message[] = [
  {
    id: "msg-3-1",
    senderId: "admin-1",
    recipientId: "client-1",
    content: "Hello, this is the administrative team at Sukooni. We're reaching out regarding your recent insurance submission.",
    timestamp: subDays(now, 5).toISOString(),
    read: true,
    senderName: "Admin Support",
    senderRole: "admin",
  },
  {
    id: "msg-3-2",
    senderId: "client-1",
    recipientId: "admin-1",
    content: "Hi! Yes, I submitted my new insurance information last week. Is there a problem?",
    timestamp: subDays(now, 5).toISOString(),
    read: true,
  },
  {
    id: "msg-3-3",
    senderId: "admin-1",
    recipientId: "client-1",
    content: "No problem at all. We just needed to verify a few details. Could you please confirm your policy number starts with BHC-5544?",
    timestamp: subDays(now, 4).toISOString(),
    read: true,
    senderName: "Admin Support",
    senderRole: "admin",
  },
  {
    id: "msg-3-4",
    senderId: "client-1",
    recipientId: "admin-1",
    content: "That's correct. It's BHC-5544-789.",
    timestamp: subDays(now, 4).toISOString(),
    read: true,
  },
  {
    id: "msg-3-5",
    senderId: "admin-1",
    recipientId: "client-1",
    content: "Thank you for confirming. We'll update your records accordingly.",
    timestamp: subDays(now, 3).toISOString(),
    read: true,
    senderName: "Admin Support",
    senderRole: "admin",
  },
  {
    id: "msg-3-6",
    senderId: "admin-1",
    recipientId: "client-1",
    content: "Your insurance information has been updated.",
    timestamp: subDays(now, 3).toISOString(),
    read: true,
    senderName: "Admin Support",
    senderRole: "admin",
  },
];

// Conversation 4 messages
const conversation4Messages: Message[] = [
  {
    id: "msg-4-1",
    senderId: "therapist-3",
    recipientId: "client-1",
    content: "Hello, I'm Dr. Emily Rodriguez. I've been assigned to conduct your initial consultation next week. I specialize in cognitive behavioral therapy and anxiety management.",
    timestamp: subDays(now, 6).toISOString(),
    read: true,
    senderName: "Dr. Emily Rodriguez",
    senderRole: "therapist",
  },
  {
    id: "msg-4-2",
    senderId: "client-1",
    recipientId: "therapist-3",
    content: "Hi Dr. Rodriguez, it's nice to meet you. I'm looking forward to our consultation.",
    timestamp: subDays(now, 6).toISOString(),
    read: true,
  },
  {
    id: "msg-4-3",
    senderId: "therapist-3",
    recipientId: "client-1",
    content: "It's nice to meet you too. Before our session, I'd recommend taking some time to think about what specific areas you'd like to focus on during our work together.",
    timestamp: subDays(now, 5).toISOString(),
    read: true,
    senderName: "Dr. Emily Rodriguez",
    senderRole: "therapist",
  },
  {
    id: "msg-4-4",
    senderId: "client-1",
    recipientId: "therapist-3",
    content: "I'll definitely do that. I've been dealing with work-related stress and some social anxiety that I'd like to address.",
    timestamp: subDays(now, 5).toISOString(),
    read: true,
  },
  {
    id: "msg-4-5",
    senderId: "therapist-3",
    recipientId: "client-1",
    content: "Those are common concerns that we can definitely work on together. Looking forward to our initial consultation.",
    timestamp: subDays(now, 5).toISOString(),
    read: true,
    senderName: "Dr. Emily Rodriguez",
    senderRole: "therapist",
  },
];

export const mockMessagesByConversation = {
  "conv-1": conversation1Messages,
  "conv-2": conversation2Messages,
  "conv-3": conversation3Messages,
  "conv-4": conversation4Messages,
};

// Helper function to get messages for a specific conversation
export const getMessagesForConversation = (conversationId: string): Message[] => {
  return mockMessagesByConversation[conversationId as keyof typeof mockMessagesByConversation] || [];
};
