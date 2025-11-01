import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    
    setMessages((prev) => [...prev, userMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Olá! Sou um assistente de IA. Como posso ajudá-lo hoje?",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-chat-background">
      {/* Header */}
      <header className="flex justify-end p-6">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full hover:bg-muted"
        >
          <Clock className="h-5 w-5 text-muted-foreground" />
        </Button>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground text-center">
                Como posso ajudá-lo hoje?
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <HelpCircle className="h-5 w-5" />
                <p className="text-base">O que você pode fazer?</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-6 border-t border-border/50">
        <ChatInput onSend={handleSendMessage} />
      </footer>
    </div>
  );
};
