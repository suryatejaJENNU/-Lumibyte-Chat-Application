import React, { useState } from "react";
import Button from "../ui/Button";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async () => {
    const t = text.trim();
    if (!t) return;
    setSending(true);
    try {
      await onSend(t);
      setText("");
    } catch (e) {
      console.error(e);
      alert("Send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900">
      <div className="flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Type your question..."
          className="flex-1 border rounded-lg px-4 py-2 dark:bg-gray-800"
        />
        <Button onClick={submit} className="min-w-[92px]">
          {sending ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
