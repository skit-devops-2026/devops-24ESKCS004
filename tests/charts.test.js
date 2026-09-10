const test = require("node:test");
const assert = require("node:assert/strict");
const { Charts } = require("../js/charts.js");

test("SVG Charts Generation Suite", async (t) => {
  await t.test("_fmtK formats thousands correctly", () => {
    assert.equal(Charts._fmtK(1000), "$1k");
    assert.equal(Charts._fmtK(2500), "$2.5k");
    assert.equal(Charts._fmtK(500), "$500");
  });

  await t.test("Line chart generates valid SVG markup", () => {
    const svg = Charts.line({
      width: 600,
      height: 200,
      labels: ["Jan", "Feb", "Mar"],
      series: [
        { values: [100, 150, 200], color: "#10b981", dots: true }
      ]
    });

    assert.ok(svg.startsWith("<svg"), "Must produce opening <svg> tag");
    assert.ok(svg.includes('viewBox="0 0 600 200"'), "viewBox must match width and height");
    assert.ok(svg.includes("<polyline"), "Must render polyline for series");
    assert.ok(svg.includes("<circle"), "Must render dots for series points");
    assert.ok(svg.includes("</svg>"), "Must properly close SVG tag");
  });

  await t.test("Bar chart generates valid SVG with rect elements", () => {
    const svg = Charts.bar({
      width: 500,
      height: 250,
      labels: ["Food", "Rent"],
      groups: [
        { label: "Actual", color: "#3b82f6", values: [200, 800] }
      ]
    });

    assert.ok(svg.startsWith("<svg"), "Must produce opening <svg> tag");
    assert.ok(svg.includes("<rect"), "Must contain rect elements for bars");
    assert.ok(svg.includes("Food") && svg.includes("Rent"), "Must include category labels");
  });

  await t.test("Ring chart renders circular SVG progress gauge", () => {
    const svg = Charts.ring({
      size: 120,
      pct: 75,
      color: "#6366f1",
      thickness: 10
    });

    assert.ok(svg.includes("<circle"), "Must render SVG circles for track and progress");
    assert.ok(svg.includes('stroke="#6366f1"'), "Must apply custom progress color");
    assert.ok(svg.includes('viewBox="0 0 120 120"'), "Must size SVG according to parameter");
  });

  await t.test("Donut chart renders segmented SVG arcs", () => {
    const svg = Charts.donut({
      size: 160,
      thickness: 20,
      segments: [
        { pct: 50, color: "#10b981" },
        { pct: 50, color: "#f59e0b" }
      ]
    });

    assert.ok(svg.includes("<path"), "Donut chart must contain SVG paths for slices");
    assert.ok(svg.includes("#10b981") && svg.includes("#f59e0b"), "Must include slice colors");
  });
});
