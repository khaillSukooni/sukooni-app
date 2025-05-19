
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Archive } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockConversations, getMessagesForConversation } from "@/lib/data/mockMessages";
import { Conversation, Message } from "@/lib/types/message";
import MessageThread from "@/components/messaging/MessageThread";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const ClientMessages = () => {
  const { profile } = useAuth();
  
  // Use the first conversation (active therapist) as the default
  const [activeConversation, setActiveConversation] = useState<Conversation>(mockConversations[0]);
  
  // Get messages for the active conversation
  const [messages, setMessages] = useState<Message[]>(
    getMessagesForConversation(activeConversation.id)
  );
  
  const [newMessage, setNewMessage] = useState("");
  const [showingArchived, setShowingArchived] = useState(false);
  
  // Filter only therapist conversations (for archive feature)
  const therapistConversations = mockConversations.filter(
    conversation => conversation.participantRole === "therapist"
  );
  
  // The active conversation is always the first one, others are considered "archived"
  const archivedConversations = therapistConversations.slice(1);
  
  const handleSelectArchivedConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setMessages(getMessagesForConversation(conversation.id));
    setShowingArchived(true);
  };
  
  const handleReturnToActiveConversation = () => {
    setActiveConversation(therapistConversations[0]);
    setMessages(getMessagesForConversation(therapistConversations[0].id));
    setShowingArchived(false);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMsg: Message = {
      id: `new-msg-${Date.now()}`,
      senderId: profile?.id || "client-1",
      recipientId: activeConversation.participantId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Secure Messaging</h1>
        
        {archivedConversations.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Archive className="h-4 w-4" />
                <span className="hidden sm:inline">View Archived Conversations</span>
                <span className="sm:hidden">Archives</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {archivedConversations.map((conversation) => (
                <DropdownMenuItem 
                  key={conversation.id}
                  onClick={() => handleSelectArchivedConversation(conversation)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback className="bg-brand-blue text-white text-xs">
                      {conversation.participantName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{conversation.participantName}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      {/* Message Thread Panel - now full width */}
      <Card className="flex-1 flex flex-col h-full">
        <CardHeader className="border-b p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarFallback className="bg-brand-blue text-white">
                  {activeConversation?.participantName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">
                  {activeConversation?.participantName}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {activeConversation?.participantRole.charAt(0).toUpperCase() + 
                  activeConversation?.participantRole.slice(1)}
                </p>
              </div>
            </div>
            
            {showingArchived && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReturnToActiveConversation}
                className="text-sm"
              >
                Return to Active Chat
              </Button>
            )}
          </div>
        </CardHeader>
        
        <MessageThread 
          messages={messages} 
          currentUserId={profile?.id || "client-1"} 
        />
        
        {!showingArchived ? (
          <form 
            onSubmit={handleSendMessage}
            className="border-t p-4 flex items-center gap-3"
          >
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <div className="border-t p-4 bg-muted/30">
            <p className="text-center text-muted-foreground text-sm">
              This is an archived conversation. You cannot send new messages.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClientMessages;
