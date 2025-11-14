import React, { useState } from "react";
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
        className={`px-3 py-1 rounded ${
          fb === "like"
            ? "bg-accent-600 text-white"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        👍 Like
      </button>
      <button
        onClick={() => click("dislike")}
        className={`px-3 py-1 rounded ${
          fb === "dislike"
            ? "bg-red-600 text-white"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        👎 Dislike
      </button>
    </div>
  );
}
