
import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import { Message } from "@/lib/types/message";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
}

const MessageThread: React.FC<MessageThreadProps> = ({ messages, currentUserId }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessageTime = (timestamp: string) => {
    return format(new Date(timestamp), "h:mm a");
  };

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach(message => {
    const date = format(new Date(message.timestamp), "yyyy-MM-dd");
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "EEEE, MMMM d, yyyy");
  };

  return (
    <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="mb-6">
          <div className="text-center mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {formatDateHeader(date)}
            </span>
          </div>

          {dateMessages.map((message, index) => {
            const isSentByMe = message.senderId === currentUserId;
            const isFirstInSequence = index === 0 || dateMessages[index - 1].senderId !== message.senderId;
            
            return (
              <div 
                key={message.id} 
                className={`flex mb-3 ${isSentByMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isSentByMe && isFirstInSequence && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarFallback className={
                      message.senderRole === "therapist" ? "bg-brand-blue text-white" : 
                      "bg-brand-yellow text-brand-dark-blue"
                    }>
                      {message.senderName ? message.senderName.split(" ").map(n => n[0]).join("") : "U"}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                {!isSentByMe && !isFirstInSequence && (
                  <div className="w-8 mr-2"></div>
                )}
                
                <div className={`max-w-[75%] ${!isSentByMe && isFirstInSequence ? "" : ""}`}>
                  {!isSentByMe && isFirstInSequence && (
                    <div className="text-sm font-medium ml-1 mb-1">
                      {message.senderName || "Unknown User"}
                    </div>
                  )}
                  
                  <div className={`
                    p-3 rounded-lg ${isSentByMe ? 
                      'bg-brand-blue text-white rounded-br-none' : 
                      'bg-gray-100 rounded-bl-none'
                    }
                  `}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  <div className={`text-xs text-muted-foreground mt-1 ${isSentByMe ? 'text-right' : 'text-left'}`}>
                    {formatMessageTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No messages in this conversation yet</p>
        </div>
      )}
    </div>
  );
};

export default MessageThread;
