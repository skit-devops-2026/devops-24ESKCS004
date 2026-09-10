/* Shared mock data for the Twinfin demo. In a real app this would come
   from an API — kept in one place so every page reads the same numbers. */

const TWINFIN_DATA = {
  user: {
    name: "Amara Kowalski",
    first: "Amara",
    initials: "AK",
    email: "amara.kowalski@email.com",
    memberSince: "Jan 2024",
    phone: "+1 (415) 555-0192",
    dob: "1992-06-14",
    occupation: "UX Designer",
    city: "San Francisco",
    state: "California",
    country: "United States",
    timezone: "America/Los_Angeles",
  },

  monthLabels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],

  cashflow: {
    income: [4980, 5010, 5240, 5080, 5260, 5270],
    expenses: [2960, 2820, 2680, 2560, 2680, 1284],
  },

  netWorth: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    values: [34100, 35300, 36600, 37700, 38300, 39400, 39700, 40500, 42180],
  },

  savingsRateHistory: [21.4, 22.8, 24.1, 21.9, 23.2, 26.4],

  spendingByCategory: {
    // month totals + budget for the "Actual vs Budget" chart
    labels: ["Housing", "Food", "Transport", "Utilities", "Health", "Leisure"],
    actual: [1450, 682, 112, 254, 108, 128],
    budget: [1450, 600, 150, 260, 120, 150],
  },

  septemberBreakdown: [
    { label: "Housing", pct: 52, amount: 1450, color: "#1f3d33" },
    { label: "Food", pct: 25, amount: 682, color: "#bd6a34" },
    { label: "Transport", pct: 4, amount: 112, color: "#5a56a6" },
    { label: "Utilities", pct: 9, amount: 254, color: "#6b6a60" },
    { label: "Health", pct: 4, amount: 108, color: "#3c7a4f" },
    { label: "Entertainment", pct: 1, amount: 29, color: "#a34a68" },
    { label: "Shopping", pct: 5, amount: 128, color: "#caa15a" },
  ],

  financialHealth: {
    score: 78,
    status: "Good",
    breakdown: [
      { label: "Emergency Fund", value: 85 },
      { label: "Debt Ratio", value: 72 },
      { label: "Savings Rate", value: 88 },
      { label: "Spending Control", value: 67 },
      { label: "Investment Growth", value: 74 },
    ],
  },

  savingsAllocation: [
    { label: "Emergency Fund", amount: 522, pct: 40 },
    { label: "Vacation 2027", amount: 326, pct: 25 },
    { label: "Investment", amount: 326, pct: 25 },
    { label: "Other Goals", amount: 131, pct: 10 },
  ],

  goals: [
    {
      category: "Security",
      title: "Emergency Fund",
      saved: 11200,
      target: 15000,
      monthly: 500,
      due: "Dec 2026",
      months: 8,
      color: "green",
    },
    {
      category: "Travel",
      title: "Japan Vacation",
      saved: 2400,
      target: 6000,
      monthly: 326,
      due: "Mar 2027",
      months: 12,
      color: "clay",
    },
    {
      category: "Technology",
      title: "New Laptop",
      saved: 1750,
      target: 2500,
      monthly: 250,
      due: "Oct 2026",
      months: 3,
      color: "green",
    },
    {
      category: "Investments",
      title: "Investment Portfolio",
      saved: 18400,
      target: 50000,
      monthly: 600,
      due: "Jan 2030",
      months: 53,
      color: "green",
    },
    {
      category: "Housing",
      title: "Home Down Payment",
      saved: 12000,
      target: 80000,
      monthly: 1200,
      due: "Jun 2029",
      months: 57,
      color: "clay",
    },
  ],

  plannerEvents: [
    { type: "Bill", title: "Rent Payment", tag: "Monthly", amount: -1450, date: "Sep 5", note: "Auto-pay via Chase" },
    { type: "Income", title: "Freelance Invoice Due", tag: "", amount: 750, date: "Sep 7", note: "Client: Studio Vera" },
    { type: "Bill", title: "Car Insurance Premium", tag: "Monthly", amount: -89, date: "Sep 10", note: "" },
    { type: "Purchase", title: "iPhone Upgrade", tag: "", amount: -429, date: "Sep 14", note: "Planned — budget allocated" },
    { type: "Income", title: "Salary Deposit", tag: "Bi-weekly", amount: 4200, date: "Sep 15", note: "" },
    { type: "Reminder", title: "Review Q3 Spending", tag: "", amount: null, date: "Sep 20", note: "Check against budget goals" },
    { type: "Bill", title: "Electric Bill", tag: "Monthly", amount: -112, date: "Sep 22", note: "" },
    { type: "Transfer", title: "Transfer to Emergency Fund", tag: "", amount: -500, date: "Sep 25", note: "Monthly goal contribution" },
    { type: "Bill", title: "Gym Membership", tag: "Monthly", amount: -45, date: "Sep 28", note: "" },
  ],

  transactions: [
    { desc: "Interest Income", date: "Sep 22, 2026", merchant: "Marcus by GS", category: "Income", account: "Marcus Savings", amount: 52.4 },
    { desc: "Zara — Jacket", date: "Sep 21, 2026", merchant: "Zara", category: "Shopping", account: "Checking", amount: -89.95 },
    { desc: "Water & Sewer", date: "Sep 20, 2026", merchant: "SFPUC", category: "Utilities", account: "Checking", amount: -42.0 },
    { desc: "Starbucks", date: "Sep 19, 2026", merchant: "Starbucks", category: "Food", account: "Checking", amount: -7.4 },
    { desc: "Gym Membership", date: "Sep 18, 2026", merchant: "Equinox", category: "Health", account: "Checking", amount: -45.0 },
    { desc: "Transfer to Savings", date: "Sep 17, 2026", merchant: "Marcus by GS", category: "Transfer", account: "Checking", amount: -500.0 },
    { desc: "Chipotle", date: "Sep 16, 2026", merchant: "Chipotle", category: "Food", account: "Checking", amount: -14.75 },
    { desc: "Salary Deposit", date: "Sep 15, 2026", merchant: "Employer", category: "Income", account: "Checking", amount: 4200.0 },
    { desc: "Doctor Visit Copay", date: "Sep 13, 2026", merchant: "SF Health Clinic", category: "Health", account: "Checking", amount: -40.0 },
    { desc: "Uber", date: "Sep 12, 2026", merchant: "Uber", category: "Transport", account: "Checking", amount: -24.6 },
    { desc: "Whole Foods", date: "Sep 11, 2026", merchant: "Whole Foods", category: "Food", account: "Checking", amount: -68.32 },
    { desc: "Car Insurance Premium", date: "Sep 10, 2026", merchant: "Geico", category: "Transport", account: "Checking", amount: -89.0 },
    { desc: "Netflix Subscription", date: "Sep 9, 2026", merchant: "Netflix", category: "Entertainment", account: "Checking", amount: -15.99 },
    { desc: "Freelance Payment", date: "Sep 8, 2026", merchant: "Studio Vera", category: "Income", account: "Checking", amount: 750.0 },
    { desc: "Rent Payment", date: "Sep 5, 2026", merchant: "Parkview Realty", category: "Housing", account: "Checking", amount: -1450.0 },
    { desc: "Trader Joe's", date: "Sep 4, 2026", merchant: "Trader Joe's", category: "Food", account: "Checking", amount: -52.1 },
    { desc: "Spotify", date: "Sep 3, 2026", merchant: "Spotify", category: "Entertainment", account: "Checking", amount: -11.99 },
    { desc: "Electric Bill", date: "Sep 2, 2026", merchant: "PG&E", category: "Utilities", account: "Checking", amount: -74.0 },
    { desc: "Grocery — Whole Foods", date: "Sep 1, 2026", merchant: "Whole Foods", category: "Food", account: "Checking", amount: -84.5 },
    { desc: "Interest Income", date: "Aug 31, 2026", merchant: "Fidelity", category: "Income", account: "Fidelity", amount: 199.4 },
  ],

  recentActivity: [
    { desc: "Grocery — Whole Foods", category: "Food", date: "Today", amount: -84.5 },
    { desc: "Salary Deposit", category: "Income", date: "Sep 1", amount: 4200.0 },
    { desc: "Netflix Subscription", category: "Entertainment", date: "Aug 31", amount: -15.99 },
    { desc: "Electricity Bill", category: "Utilities", date: "Aug 30", amount: -112.0 },
    { desc: "Freelance Payment", category: "Income", date: "Aug 29", amount: 750.0 },
  ],

  linkedAccounts: [
    { name: "Chase Bank", type: "Checking", last4: "4821", balance: 3412.5 },
    { name: "Marcus by GS", type: "Savings", last4: "9034", balance: 11200.0 },
    { name: "Fidelity", type: "Investment", last4: "2217", balance: 18400.0 },
  ],

  insights: [
    {
      tag: "Positive",
      title: "Best month for savings",
      body: "September is on track to be your highest savings month this year, driven by lower discretionary spend and the Studio Vera freelance payment.",
    },
    {
      tag: "Watch",
      title: "Food spend slightly over",
      body: "You've spent $82 more on food than your $600 budget this month. Two extra dining-out sessions account for most of the gap.",
    },
    {
      tag: "On Track",
      title: "Net worth milestone ahead",
      body: "At your current trajectory, you'll cross $45,000 net worth by November 2026 — roughly 6 weeks ahead of your original projection.",
    },
  ],
};

function fmtMoney(n, opts) {
  opts = opts || {};
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : opts.forcePlus && n > 0 ? "+" : "";
  return (
    sign +
    "$" +
    abs.toLocaleString("en-US", {
      minimumFractionDigits: opts.decimals === false ? 0 : 2,
      maximumFractionDigits: opts.decimals === false ? 0 : 2,
    })
  );
}
