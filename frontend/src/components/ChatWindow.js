import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import TableResponse from "./TableResponse";
import AnswerFeedback from "./AnswerFeedback";
import { fetchSessionHistory, postChat } from "../api";

export default function ChatWindow({ onSessionChange }) {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if (!sessionId) { setMessages([]); return; }
    load(sessionId);
  }, [sessionId]);

  const load = async (id) => {
    setLoading(true);
    try {
      const hist = await fetchSessionHistory(id);
      setMessages(hist || []);
    } catch (e) {
      console.error(e);
      setMessages([]);
    } finally { setLoading(false); }
  };

  const send = async (text) => {
    if (!sessionId) return;
    try {
      const msg = await postChat(sessionId, text);
      setMessages(prev => [...prev, msg]);
      if (onSessionChange) onSessionChange();
    } catch (e) {
      console.error(e);
      alert("Send failed");
    }
  };

  const handleFeedback = (messageId, fb) => {
    setMessages(prev => prev.map(m => m.id === messageId ? {...m, feedback: fb} : m));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="text-lg font-semibold">Conversation</div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {loading && <div className="text-muted">Loading...</div>}
        {!loading && messages.length === 0 && <div className="text-muted">No messages yet.</div>}

        {messages.map(m => (
          <div key={m.id} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-gray-800 dark:text-gray-100">Q: {m.question}</div>
            {m.answer?.description && <div className="mt-2 text-gray-600 dark:text-gray-300">{m.answer.description}</div>}
            <TableResponse data={m.answer?.table} />
            <AnswerFeedback initial={m.feedback} onFeedback={(fb) => handleFeedback(m.id, fb)} sessionId={sessionId} messageId={m.id}/>
          </div>
        ))}
      </div>

      <div className="border-t">
        <ChatInput onSend={send} />
      </div>
    </div>
  );
}