import React, { useEffect, useState } from "react";
import Button from "../ui/Button";

export default function RenameModal({ open, session, onClose, onSave }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (session) setTitle(session.title || "");
    else setTitle("");
  }, [session]);

  if (!open) return null;

  const save = async () => {
    if (!title.trim()) {
      alert("Title required");
      return;
    }
    await onSave(title.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 z-10 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Rename chat</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4 dark:bg-gray-800"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-md
              border border-gray-300
              text-gray-700 
              dark:text-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              hover:bg-gray-100 
              dark:hover:bg-gray-700
              transition
            "
          >
            Cancel
          </button>
          <Button onClick={save}>Save</Button>
        </div>
      </div>
    </div>
  );
}
