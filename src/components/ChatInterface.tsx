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

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("https://n8n.s7tedigital.tech/webhook/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();
      const responseContent = data.response || data.message || "Desculpe, não consegui processar sua mensagem.";
      
      // Não exibir mensagem do workflow
      if (responseContent === "Workflow was started") {
        return;
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
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
