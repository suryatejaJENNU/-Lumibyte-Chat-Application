import React from "react";
import Button from "../ui/Button";

export default function Home({ onNewChat }) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-3" style={{ color: "#6366F1" }}>
        Welcome
      </h1>
      <p className="text-sm text-muted mb-6">
        Start a new chat to get structured responses.
      </p>
      <Button onClick={onNewChat}>+ New Chat</Button>
    </div>
  );
}
