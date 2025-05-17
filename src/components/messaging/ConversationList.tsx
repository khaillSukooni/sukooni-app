
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { Conversation } from "@/lib/types/message";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | undefined;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
}) => {
  // Format timestamp to show different formats based on how recent
  const formatMessageTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    
    if (isToday(date)) {
      return format(date, "h:mm a");
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No conversations found
      </div>
    );
  }

  return (
    <div className="divide-y">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`p-4 cursor-pointer hover:bg-muted/50 ${
            selectedConversationId === conversation.id ? "bg-muted" : ""
          }`}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback className="bg-brand-blue text-white">
                {conversation.participantName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm truncate">
                  {conversation.participantName}
                </h4>
                {conversation.lastMessageTimestamp && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatMessageTimestamp(conversation.lastMessageTimestamp)}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground truncate">
                {conversation.lastMessage || "No messages yet"}
              </p>
            </div>
            
            {conversation.unreadCount > 0 && (
              <div className="flex-shrink-0 rounded-full bg-brand-blue w-5 h-5 flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {conversation.unreadCount}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
