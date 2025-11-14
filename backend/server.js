
const express = require("express");
const cors = require("cors");
const { sessions, sessionHistory, uid } = require("./mockData");

const app = express();
app.use(cors());
app.use(express.json());

const API = "/api";


app.get(`${API}/sessions`, (req, res) => {
 
  const out = sessions.slice().sort((a, b) => b.createdAt - a.createdAt);
  res.json(out);
});


app.get(`${API}/new-chat`, (req, res) => {
  const title =
    req.query.title && String(req.query.title).trim().length
      ? req.query.title
      : "New Chat";
  const id = uid.new();
  const session = { id, title, createdAt: Date.now() };
  sessions.push(session);
  sessionHistory[id] = [];
  res.json({ sessionId: id, title });
});


app.get(`${API}/session/:id`, (req, res) => {
  const id = req.params.id;
  res.json(sessionHistory[id] || []);
});


app.post(`${API}/chat/:id`, (req, res) => {
  const id = req.params.id;
  const { message } = req.body || {};

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "Message required" });
  }
  if (!sessionHistory[id]) {
    return res.status(404).json({ error: "Session not found" });
  }

  const lower = String(message).toLowerCase();
  
  let answer, description;
  if (
    lower.includes("sales") ||
    lower.includes("revenue") ||
    lower.includes("quarter")
  ) {
    description = "Sales summary (mock)";
    answer = {
      table: [
        { quarter: "Q1", revenue: 120000 },
        { quarter: "Q2", revenue: 150000 },
      ],
    };
  } else if (
    lower.includes("marketing") ||
    lower.includes("reach") ||
    lower.includes("click")
  ) {
    description = "Marketing KPIs (mock)";
    answer = {
      table: [
        { metric: "Reach", value: 12000 },
        { metric: "Clicks", value: 1500 },
      ],
    };
  } else {
    description = "Generic mock response";
    answer = {
      table: [
        { metric: "A", value: Math.floor(Math.random() * 100) },
        { metric: "B", value: Math.floor(Math.random() * 100) },
      ],
    };
  }

  const msg = {
    id: uid.new(),
    question: message,
    answer: { description, table: answer.table || [] },
    feedback: null,
    createdAt: Date.now(),
  };

  sessionHistory[id].push(msg);

   const session = sessions.find((s) => s.id === id);
  if (session && session.title === "New Chat") {
    session.title = String(message).slice(0, 60);
  }

  res.json(msg);
});

app.put(`${API}/session/:id`, (req, res) => {
  const id = req.params.id;
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: "Title required" });

  const s = sessions.find((x) => x.id === id);
  if (!s) return res.status(404).json({ error: "Session not found" });
  s.title = String(title).slice(0, 200);
  res.json({ ok: true, session: s });
});


app.delete(`${API}/session/:id`, (req, res) => {
  const id = req.params.id;
  const idx = sessions.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: "Session not found" });
  sessions.splice(idx, 1);
  delete sessionHistory[id];
  res.json({ ok: true });
});


app.post(`${API}/feedback/:sessionId/:messageId`, (req, res) => {
  const { sessionId, messageId } = req.params;
  const { feedback } = req.body || {};
  if (!sessionHistory[sessionId])
    return res.status(404).json({ error: "Session not found" });
  const msg = sessionHistory[sessionId].find((m) => m.id === messageId);
  if (!msg) return res.status(404).json({ error: "Message not found" });
  msg.feedback = feedback;
  res.json({ ok: true, message: msg });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}${API}`);
});
