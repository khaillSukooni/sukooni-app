
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, formatDistanceToNow } from "date-fns";
import { Send, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockConversations, getMessagesForConversation } from "@/lib/data/mockMessages";
import { Conversation, Message } from "@/lib/types/message";
import ConversationList from "@/components/messaging/ConversationList";
import MessageThread from "@/components/messaging/MessageThread";

const ClientMessages = () => {
  const { profile } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations.length > 0 ? mockConversations[0] : null
  );
  const [messages, setMessages] = useState<Message[]>(
    selectedConversation ? getMessagesForConversation(selectedConversation.id) : []
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter conversations based on search query
  const filteredConversations = mockConversations.filter(
    (conversation) => 
      conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(getMessagesForConversation(conversation.id));
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;
    
    const newMsg: Message = {
      id: `new-msg-${Date.now()}`,
      senderId: profile?.id || "client-1",
      recipientId: selectedConversation.participantId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Secure Messaging</h1>
      
      <div className="flex flex-1 gap-5 h-full overflow-hidden">
        {/* Conversations Panel */}
        <Card className="w-1/3 max-w-xs flex flex-col h-full">
          <CardHeader className="p-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto">
            <ConversationList 
              conversations={filteredConversations}
              selectedConversationId={selectedConversation?.id}
              onSelectConversation={handleSelectConversation}
            />
          </CardContent>
        </Card>
        
        {/* Message Thread Panel */}
        <Card className="flex-1 flex flex-col h-full">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b p-4 flex-shrink-0">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarFallback className="bg-brand-blue text-white">
                      {selectedConversation.participantName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {selectedConversation.participantName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.participantRole.charAt(0).toUpperCase() + 
                      selectedConversation.participantRole.slice(1)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <MessageThread 
                messages={messages} 
                currentUserId={profile?.id || "client-1"} 
              />
              
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
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ClientMessages;
