const test = require("node:test");
const assert = require("node:assert/strict");
const { TWINFIN_DATA } = require("../js/data.js");

test("Data Integrity & Schema Validation Suite", async (t) => {
  await t.test("User profile contains all mandatory fields", () => {
    const user = TWINFIN_DATA.user;
    assert.ok(user.name, "User must have a name");
    assert.ok(user.email.includes("@"), "User must have a valid email format");
    assert.ok(user.city && user.country, "User location must be present");
    assert.ok(user.occupation, "User occupation must be defined");
  });

  await t.test("Savings goals have target amounts and positive values", () => {
    const goals = TWINFIN_DATA.goals;
    assert.ok(Array.isArray(goals), "Goals must be an array");
    assert.ok(goals.length >= 3, "At least 3 savings goals must be defined");
    goals.forEach((goal) => {
      assert.ok(goal.title, "Goal must have a title");
      assert.ok(goal.target > 0, "Goal target must be positive");
      assert.ok(goal.saved >= 0, "Goal saved amount must be non-negative");
      assert.ok(goal.saved <= goal.target, "Saved cannot exceed target in base goals");
      assert.ok(goal.monthly > 0, "Monthly contribution target must be positive");
    });
  });

  await t.test("Transactions ledger records valid operations", () => {
    const txs = TWINFIN_DATA.transactions;
    assert.ok(Array.isArray(txs), "Transactions must be an array");
    assert.ok(txs.length >= 5, "At least 5 transactions must be present in ledger");
    txs.forEach((tx) => {
      assert.ok(tx.desc, "Transaction must have a description");
      assert.ok(tx.date, "Transaction must have date");
      assert.ok(tx.merchant, "Transaction must specify merchant");
      assert.ok(tx.category, "Transaction must specify category");
      assert.ok(typeof tx.amount === "number", "Amount must be numerical");
      assert.ok(tx.account, "Transaction must specify an account");
    });
  });
});
