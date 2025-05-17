
import { Conversation } from "../types/message";
import { now, today } from "./mockDates";
import { subDays, subHours } from "date-fns";

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
