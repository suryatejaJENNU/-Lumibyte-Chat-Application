import React, { useState, useEffect, useRef } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMessageCircle,
  FiUser,
} from "react-icons/fi";
import Button from "../ui/Button";
import RenameModal from "./RenameModal";
import ConfirmDialog from "./ConfirmDialog";
import { renameSession as apiRename, deleteSession as apiDelete } from "../api";

export default function Sidebar({
  sessions = [],
  onNewChat,
  onSelect,
  onDelete,
  onRename,
  collapsed,
  setCollapsed,
  activeId,
  user,
  mobileOpen,
  setMobileOpen,
}) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetSession, setTargetSession] = useState(null);
  const listRef = useRef(null);

 
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 768);

  useEffect(() => {
    function onResize() {
      const mdUp = window.innerWidth >= 768;
      setIsMdUp(mdUp);

            if (mdUp && mobileOpen) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen, setMobileOpen]);

  
  const effectiveCollapsed = isMdUp ? collapsed : false;


  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, setMobileOpen]);

  const openRename = (session) => {
    setTargetSession(session);
    setRenameOpen(true);
  };

  const openConfirm = (session) => {
    setTargetSession(session);
    setConfirmOpen(true);
  };

  const doRename = async (title) => {
    if (!targetSession) return;
    if (onRename) await onRename(targetSession.id, title);
    else await apiRename(targetSession.id, title);
    setRenameOpen(false);
    setTargetSession(null);
    if (mobileOpen) setMobileOpen(false);
  };

  const doDelete = async () => {
    if (!targetSession) return;
    try {
      await apiDelete(targetSession.id);
      if (onDelete) onDelete(targetSession.id);
    } finally {
      setConfirmOpen(false);
      setTargetSession(null);
      if (mobileOpen) setMobileOpen(false);
    }
  };

  const toggle = () => {
    if (!isMdUp) setMobileOpen((v) => !v);
    else setCollapsed((v) => !v);
  };

  return (
    <>
     
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

    
      <aside
        aria-label="Chat sidebar"
        className={`
          fixed md:static top-0 left-0 z-50
          transform transition-transform duration-200
          bg-white dark:bg-gray-900 border-r
          flex flex-col h-screen min-h-0

          /* Mobile width always full */
          w-72

          /* Desktop collapse/expand */
          ${effectiveCollapsed ? "md:w-20" : "md:w-72"}

          /* Mobile show/hide */
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ boxShadow: "0 6px 30px rgba(2,6,23,0.08)" }}
      >
       
        <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-accent-500 text-white flex items-center justify-center">
              <FiMessageCircle />
            </div>
            {!effectiveCollapsed && (
              <div className="text-lg font-semibold">Chats</div>
            )}
          </div>

          <button
            onClick={toggle}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {effectiveCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

      
        <div className="p-4 border-b shrink-0">
          <Button
            onClick={() => {
              onNewChat();
              if (!isMdUp) setMobileOpen(false);
            }}
            className="w-full"
          >
            <FiPlus />
            {!effectiveCollapsed && <span className="ml-2">New Chat</span>}
          </Button>
        </div>

    
        <div
          ref={listRef}
          className="flex-1 min-h-0 overflow-y-auto px-3 py-3"
          role="list"
        >
          {sessions.length === 0 && !effectiveCollapsed && (
            <p className="text-sm text-muted px-2">No chats</p>
          )}

          <div className="space-y-2">
            {sessions.map((s) => {
              const active = s.id === activeId;
              return (
                <div
                  key={s.id}
                  role="listitem"
                  onClick={() => {
                    onSelect(s.id);
                    if (!isMdUp) setMobileOpen(false);
                  }}
                  tabIndex={0}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition
                    ${
                      active
                        ? "bg-accent-50 dark:bg-gray-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-8 h-8 bg-accent-500 text-white rounded-md flex items-center justify-center">
                      {s.title?.charAt(0)?.toUpperCase() || "N"}
                    </div>
                    {!effectiveCollapsed && (
                      <span className="truncate font-medium">{s.title}</span>
                    )}
                  </div>

                  {!effectiveCollapsed && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openRename(s);
                        }}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openConfirm(s);
                        }}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

       
        <div className="border-t p-4 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <FiUser />
          </div>
          {!effectiveCollapsed && (
            <div className="truncate">
              <div className="font-medium">{user?.name}</div>
              <div className="text-xs text-muted">{user?.email}</div>
            </div>
          )}
        </div>
      </aside>

   
      <RenameModal
        open={renameOpen}
        session={targetSession}
        onClose={() => setRenameOpen(false)}
        onSave={doRename}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete chat?"
        description={`Delete "${targetSession?.title}"? This cannot be undone.`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={doDelete}
      />
    </>
  );
}
