import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-6 py-4 rounded-2xl max-w-[80%] break-words",
        role === "user" 
          ? "bg-chat-user ml-auto" 
          : "bg-chat-assistant mr-auto"
      )}
    >
      <p className="text-foreground leading-relaxed">{content}</p>
    </div>
  );
};
