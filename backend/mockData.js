const short = require("short-uuid");
const uid = short();

function now() {
  return Date.now();
}



let sessions = [
  {
    id: uid.new(),
    title: "Marketing Analysis",
    createdAt: now() - 1000 * 60 * 60 * 24,
  },
  {
    id: uid.new(),
    title: "Sales Overview",
    createdAt: now() - 1000 * 60 * 60 * 12,
  },
  {
    id: uid.new(),
    title: "Customer Behavior Insights",
    createdAt: now() - 1000 * 60 * 60 * 48,
  },
  {
    id: uid.new(),
    title: "Product Performance Report",
    createdAt: now() - 1000 * 60 * 30,
  },
  {
    id: uid.new(),
    title: "Website Analytics",
    createdAt: now() - 1000 * 60 * 10,
  },
  {
    id: uid.new(),
    title: "Financial Summary",
    createdAt: now() - 1000 * 60 * 5,
  },
];

let sessionHistory = {};
sessions.forEach((s) => (sessionHistory[s.id] = []));


sessionHistory[sessions[0].id].push(
  {
    id: uid.new(),
    question: "Show marketing KPIs",
    answer: {
      description: "Marketing KPIs (mock)",
      table: [
        { metric: "Reach", value: 12000 },
        { metric: "Clicks", value: 1500 },
        { metric: "Conversions", value: 240 },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 60 * 20,
  },
  {
    id: uid.new(),
    question: "Which campaign performed best?",
    answer: {
      description: "Campaign Performance",
      table: [
        { campaign: "Summer Sale", ROI: "184%" },
        { campaign: "Email Blast", ROI: "96%" },
        { campaign: "Instagram Ads", ROI: "72%" },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 60 * 19,
  }
);

// Session 2 — Sales Overview
sessionHistory[sessions[1].id].push(
  {
    id: uid.new(),
    question: "Show sales summary for today",
    answer: {
      description: "Sales Summary",
      table: [
        { metric: "Total Orders", value: 320 },
        { metric: "Revenue", value: "$12,450" },
        { metric: "Refunds", value: "$420" },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 60 * 10,
  },
  {
    id: uid.new(),
    question: "Weekly revenue trend?",
    answer: {
      description: "Weekly Revenue Trend",
      table: [
        { day: "Monday", revenue: 1800 },
        { day: "Tuesday", revenue: 2400 },
        { day: "Wednesday", revenue: 2000 },
        { day: "Thursday", revenue: 3500 },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 60 * 9,
  }
);


sessionHistory[sessions[2].id].push(
  {
    id: uid.new(),
    question: "What are our top customer demographics?",
    answer: {
      description: "Customer Demographics",
      table: [
        { segment: "18-24", percentage: "34%" },
        { segment: "25-34", percentage: "46%" },
        { segment: "35-44", percentage: "20%" },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 60 * 40,
  },
  {
    id: uid.new(),
    question: "Which products do they buy most?",
    answer: {
      description: "Top Purchased Products",
      table: [
        { product: "Premium Plan", count: 320 },
        { product: "Starter Plan", count: 190 },
        { product: "Add-on Pack A", count: 140 },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 60 * 38,
  }
);


sessionHistory[sessions[3].id].push(
  {
    id: uid.new(),
    question: "Show top product performance this month",
    answer: {
      description: "Product Performance",
      table: [
        { product: "Mobile App", usage: "12,300 users" },
        { product: "Web Dashboard", usage: "8,900 users" },
        { product: "API Service", usage: "5,200 calls/day" },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 25,
  }
);


sessionHistory[sessions[4].id].push(
  {
    id: uid.new(),
    question: "Show website traffic stats",
    answer: {
      description: "Traffic Overview",
      table: [
        { metric: "Visitors", value: 9870 },
        { metric: "Bounce Rate", value: "32%" },
        { metric: "Avg. Session Duration", value: "2m 40s" },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 8,
  }
);


sessionHistory[sessions[5].id].push(
  {
    id: uid.new(),
    question: "Show financial summary for Q1",
    answer: {
      description: "Financial Report",
      table: [
        { metric: "Revenue", value: "$320,000" },
        { metric: "Expenses", value: "$140,000" },
        { metric: "Net Profit", value: "$180,000" },
      ],
    },
    feedback: null,
    createdAt: now() - 1000 * 60 * 2,
  }
);

module.exports = { sessions, sessionHistory, uid };
