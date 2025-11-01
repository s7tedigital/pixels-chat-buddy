import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center gap-3 bg-chat-input rounded-3xl px-5 py-3 border border-border/50">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="shrink-0 h-8 w-8 rounded-full hover:bg-muted"
        >
          <Plus className="h-5 w-5" />
        </Button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Pergunte o que quiser..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
        />
        
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled}
          className="shrink-0 h-10 w-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all disabled:opacity-50"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};
