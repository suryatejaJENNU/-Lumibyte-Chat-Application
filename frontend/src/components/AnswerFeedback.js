import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { postFeedback } from "../api";

export default function AnswerFeedback({
  initial = null,
  onFeedback,
  sessionId,
  messageId,
}) {
  const [fb, setFb] = useState(initial);

  const click = async (val) => {
    setFb(val);
    onFeedback && onFeedback(val);

    if (sessionId && messageId) {
      try {
        await postFeedback(sessionId, messageId, val);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  return (
    <div className="flex gap-2 mt-3">
    
      <button
        onClick={() => click("like")}
        className={`flex items-center gap-1 px-3 py-1 rounded transition 
          ${
            fb === "like"
              ? "bg-green-600 text-white"      
              : "bg-gray-100 dark:bg-gray-800" 
          }`}
      >
        <ThumbsUp className="w-4 h-4" />
        Like
      </button>

     
      <button
        onClick={() => click("dislike")}
        className={`flex items-center gap-1 px-3 py-1 rounded transition 
          ${
            fb === "dislike"
              ? "bg-red-600 text-white"        
              : "bg-gray-100 dark:bg-gray-800" 
          }`}
      >
        <ThumbsDown className="w-4 h-4" />
        Dislike
      </button>
    </div>
  );
}
