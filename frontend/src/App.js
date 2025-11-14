import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import Home from "./components/Home";
import ThemeToggle from "./components/ThemeToggle";
import {
  fetchSessions,
  createNewChat,
  deleteSession,
  renameSession,
} from "./api";
import { FiMenu } from "react-icons/fi";

function AppInner() {
  const [sessions, setSessions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();
   const [mobileOpen, setMobileOpen] = useState(false);

  const loadSessions = async () => {
    try {
      const s = await fetchSessions();
      setSessions(s || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadSessions();
    const t = setInterval(loadSessions, 8000);
    return () => clearInterval(t);
  }, []);

 
  const handleNewChat = async () => {
    try {
      const res = await createNewChat("New Chat");
      const newId = res?.sessionId ?? res?.id ?? null;
      await loadSessions();
      if (newId) {
        setActiveId(newId);
        navigate(`/chat/${newId}`);
      } else {
       
        const s = await fetchSessions();
        if (s && s.length) {
          setActiveId(s[0].id);
          navigate(`/chat/${s[0].id}`);
        }
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create chat");
    }
  };

  const handleSelect = (id) => {
    setActiveId(id);
    navigate(`/chat/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSession(id);
      await loadSessions();
      if (activeId === id) {
        setActiveId(null);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
     
    }
  };

  
  const handleRename = async (id, title) => {
    try {
      await renameSession(id, title);
      await loadSessions();
    } catch (e) {
      console.error(e);
   
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        sessions={sessions}
        onNewChat={handleNewChat}
        onSelect={handleSelect}
        onDelete={handleDelete}
        onRename={handleRename}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeId={activeId}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        user={{ name: "Suryateja Jennu", email: "suryateja@example.com" }}
      />

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div
              className="text-2xl font-bold flex items-center"
              
            >
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded hover:bg-gray-100 text-accent-500"
              >
                <FiMenu />
              </button>
            <span className="text-accent-500" >Lumibyte Chat</span> 
            </div>
            <div className="text-sm text-muted">Modern + minimal</div>
          </div>
          <ThemeToggle />
        </div>

        <div className="card h-[calc(100vh-120px)] overflow-hidden">
          <Routes>
            <Route path="/" element={<Home onNewChat={handleNewChat} />} />
            <Route
              path="/chat/:sessionId"
              element={<ChatWindow onSessionChange={loadSessions} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
