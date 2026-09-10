const test = require("node:test");
const assert = require("node:assert/strict");
const { TWINFIN_DATA, fmtMoney } = require("../js/data.js");

test("Financial Calculations & Metrics Suite", async (t) => {
  await t.test("fmtMoney formats currency correctly", () => {
    assert.equal(fmtMoney(1250), "$1,250.00");
    assert.equal(fmtMoney(1250, { decimals: false }), "$1,250");
    assert.equal(fmtMoney(-500), "-$500.00");
    assert.equal(fmtMoney(500, { forcePlus: true }), "+$500.00");
    assert.equal(fmtMoney(0), "$0.00");
  });

  await t.test("Net worth has positive trajectory and matching data points", () => {
    const { labels, values } = TWINFIN_DATA.netWorth;
    assert.equal(labels.length, values.length, "Labels and values length must match");
    assert.ok(values.length >= 6, "Must have at least 6 months of net worth history");
    const latest = values[values.length - 1];
    const initial = values[0];
    assert.ok(latest > initial, "Overall net worth must show positive growth");
    assert.equal(latest, 42180, "Latest net worth must match current records");
  });

  await t.test("Cashflow income consistently covers expenses", () => {
    const { income, expenses } = TWINFIN_DATA.cashflow;
    assert.equal(income.length, expenses.length, "Income and expense months must match");
    for (let i = 0; i < income.length; i++) {
      const netSavings = income[i] - expenses[i];
      assert.ok(netSavings > 0, `Month ${i} net cashflow must be positive`);
    }
  });

  await t.test("September category breakdown totals match expected proportion", () => {
    const breakdown = TWINFIN_DATA.septemberBreakdown;
    assert.ok(Array.isArray(breakdown), "Breakdown must be an array");
    const totalPct = breakdown.reduce((sum, item) => sum + item.pct, 0);
    assert.ok(totalPct >= 95 && totalPct <= 100, "Percentage sum should account for ~100%");

    const totalAmount = breakdown.reduce((sum, item) => sum + item.amount, 0);
    assert.ok(totalAmount > 2000, "September expense total must be calculated accurately");
  });

  await t.test("Financial health score is within valid range", () => {
    const { score, status, breakdown } = TWINFIN_DATA.financialHealth;
    assert.ok(score >= 0 && score <= 100, "Health score must be between 0 and 100");
    assert.ok(["Excellent", "Good", "Fair", "Needs Attention"].includes(status));
    assert.ok(breakdown.length >= 5, "Must provide detailed health metric breakdown");
    breakdown.forEach((metric) => {
      assert.ok(metric.value >= 0 && metric.value <= 100, `${metric.label} score must be 0-100`);
    });
  });

  await t.test("Emergency fund coverage meets strict safety threshold", () => {
    const emergencyFund = TWINFIN_DATA.financialHealth.breakdown.find(
      (m) => m.label === "Emergency Fund"
    );
    assert.ok(emergencyFund, "Emergency Fund metric must exist");
    assert.ok(emergencyFund.value >= 95, "Emergency fund score must achieve minimum safety score of 95");
  });
});
