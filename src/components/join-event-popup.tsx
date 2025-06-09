"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, ExternalLink } from "lucide-react";

interface JoinEventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
  status: string;
  activity: {
    title: string;
    joinPopup?: {
      title: string;
      message: string;
    };
  };
}

// Function to detect URLs and make them clickable
const renderMessageWithLinks = (message: string) => {
  // Regular expression to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the message by URLs
  const parts = message.split(urlRegex);

  return parts.map((part, index) => {
    // Check if this part is a URL
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:text-sky-800 underline inline-flex items-center gap-1 break-all"
        >
          {part}
          <ExternalLink className="h-3 w-3 flex-shrink-0" />
        </a>
      );
    }
    // Regular text
    return <span key={index}>{part}</span>;
  });
};

export function JoinEventPopup({
  isOpen,
  onClose,
  status,
  activity,
  onJoin,
}: JoinEventPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-sky-100">
        <DialogHeader className="border-b border-sky-100 pb-4">
          <DialogTitle className="text-sky-900">
            {status || "Join Event"}
          </DialogTitle>
          <DialogDescription>{activity.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-gray-700 leading-relaxed">
            {renderMessageWithLinks(status)}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={onJoin}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
