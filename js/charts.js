/* Minimal SVG chart helpers. Each function returns an SVG string.
   Kept dependency-free so the project runs from the filesystem with
   no build step and no external chart library. */

const Charts = {
  /* ---- Line chart (single or dual series) ---- */
  line({ width = 700, height = 260, labels, series, yMax, yMin = 0, yTicks = 4 }) {
    const padL = 44,
      padR = 12,
      padT = 12,
      padB = 28;
    const w = width - padL - padR;
    const h = height - padT - padB;
    const max = yMax || Math.max(...series.flatMap((s) => s.values)) * 1.08;
    const min = yMin;
    const stepX = w / (labels.length - 1);

    const toX = (i) => padL + i * stepX;
    const toY = (v) => padT + h - ((v - min) / (max - min)) * h;

    let ticks = "";
    for (let t = 0; t <= yTicks; t++) {
      const v = min + ((max - min) * t) / yTicks;
      const y = toY(v);
      ticks += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="var(--line)" stroke-dasharray="2,3"/>`;
      ticks += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" class="chart-axis">${Charts._fmtK(v)}</text>`;
    }

    let xLabels = "";
    labels.forEach((l, i) => {
      xLabels += `<text x="${toX(i)}" y="${height - 6}" text-anchor="middle" class="chart-axis">${l}</text>`;
    });

    let paths = "";
    series.forEach((s) => {
      const pts = s.values.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
      const dash = s.dashed ? `stroke-dasharray="5,5"` : "";
      paths += `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2" ${dash} stroke-linecap="round" stroke-linejoin="round"/>`;
      if (s.dots) {
        s.values.forEach((v, i) => {
          paths += `<circle cx="${toX(i)}" cy="${toY(v)}" r="3.5" fill="${s.color}"/>`;
        });
      }
    });

    return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="none">
      ${ticks}${paths}${xLabels}
    </svg>`;
  },

  /* ---- Bar chart (single or grouped) ---- */
  bar({ width = 700, height = 260, labels, groups, yMax, colorHighlightIndex }) {
    const padL = 44,
      padR = 12,
      padT = 12,
      padB = 28;
    const w = width - padL - padR;
    const h = height - padT - padB;
    const allVals = groups.flatMap((g) => g.values);
    const max = yMax || Math.max(...allVals) * 1.15;
    const groupW = w / labels.length;
    const barGap = 6;
    const barW = (groupW - barGap * (groups.length + 1)) / groups.length;

    let ticks = "";
    const yTicks = 4;
    for (let t = 0; t <= yTicks; t++) {
      const v = (max * t) / yTicks;
      const y = padT + h - (v / max) * h;
      ticks += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="var(--line)" stroke-dasharray="2,3"/>`;
      ticks += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" class="chart-axis">${Charts._fmtK(v)}</text>`;
    }

    let bars = "";
    let xLabels = "";
    labels.forEach((label, gi) => {
      const gx = padL + gi * groupW;
      groups.forEach((g, si) => {
        const v = g.values[gi];
        const bh = (v / max) * h;
        const bx = gx + barGap + si * (barW + barGap);
        const by = padT + h - bh;
        const color =
          typeof g.color === "function" ? g.color(gi, v) : g.color;
        bars += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" rx="1.5"/>`;
      });
      xLabels += `<text x="${gx + groupW / 2}" y="${height - 6}" text-anchor="middle" class="chart-axis">${label}</text>`;
    });

    return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="none">
      ${ticks}${bars}${xLabels}
    </svg>`;
  },

  /* ---- Donut chart ---- */
  donut({ size = 180, thickness = 26, segments }) {
    const r = size / 2 - thickness / 2;
    const cx = size / 2,
      cy = size / 2;
    const total = segments.reduce((a, s) => a + s.pct, 0) || 1;
    let angle = -90;
    let arcs = "";
    segments.forEach((s) => {
      const sweep = (s.pct / total) * 360;
      const large = sweep > 180 ? 1 : 0;
      const start = Charts._polar(cx, cy, r, angle);
      const end = Charts._polar(cx, cy, r, angle + sweep);
      arcs += `<path d="M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}"
        fill="none" stroke="${s.color}" stroke-width="${thickness}" />`;
      angle += sweep;
    });
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${arcs}</svg>`;
  },

  /* ---- Ring / gauge (single value out of 100) ---- */
  ring({ size = 160, thickness = 14, value, max = 100, color = "var(--green)", track = "var(--line)" }) {
    const r = size / 2 - thickness / 2;
    const cx = size / 2,
      cy = size / 2;
    const circumference = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(1, value / max));
    const offset = circumference * (1 - pct);
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${track}" stroke-width="${thickness}"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${thickness}"
        stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
        transform="rotate(-90 ${cx} ${cy})"/>
    </svg>`;
  },

  _polar(cx, cy, r, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: (cx + r * Math.cos(rad)).toFixed(2), y: (cy + r * Math.sin(rad)).toFixed(2) };
  },

  _fmtK(v) {
    if (Math.abs(v) >= 1000) return "$" + (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "k";
    return "$" + Math.round(v);
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Charts };
}
