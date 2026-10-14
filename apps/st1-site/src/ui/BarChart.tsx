"use client";

import { useState } from "react";

import { axisTicks, formatValue, labelledBars, type BarChartSpec } from "../domain/chart";

// Fixed pixel geometry. A long chart is wider than a phone and scrolls
// sideways inside its own box, so its labels never shrink below reading size.
const PLOT_HEIGHT = 180;
const TOP = 48;
const BOTTOM = 30;
const LEFT = 46;
const RIGHT = 14;
const MAX_BAR = 24;
const CORNER = 4;

function barPath(x: number, y: number, width: number, baseline: number): string {
  const height = baseline - y;
  if (height <= CORNER) {
    return `M${String(x)},${String(baseline)} V${String(y)} H${String(x + width)} V${String(baseline)} Z`;
  }
  // Rounded at the data end, square on the baseline.
  return [
    `M${String(x)},${String(baseline)}`,
    `V${String(y + CORNER)}`,
    `Q${String(x)},${String(y)} ${String(x + CORNER)},${String(y)}`,
    `H${String(x + width - CORNER)}`,
    `Q${String(x + width)},${String(y)} ${String(x + width)},${String(y + CORNER)}`,
    `V${String(baseline)} Z`,
  ].join(" ");
}

export function BarChart({ spec }: { spec: BarChartSpec }) {
  const [active, setActive] = useState<number | null>(null);

  const count = spec.bars.length;
  const slot = count > 6 ? 30 : 76;
  const barWidth = Math.min(MAX_BAR, slot - 8);
  const plotWidth = count * slot;
  const width = LEFT + plotWidth + RIGHT;
  const height = TOP + PLOT_HEIGHT + BOTTOM;
  const baseline = TOP + PLOT_HEIGHT;

  const ticks = axisTicks(Math.max(...spec.bars.map((bar) => bar.value)));
  const top = ticks.at(-1) ?? 1;
  const yOf = (value: number) => baseline - (value / top) * PLOT_HEIGHT;
  const xOf = (index: number) => LEFT + index * slot + (slot - barWidth) / 2;

  const printed = new Set(labelledBars(spec.bars));
  const tickEvery = Math.max(1, Math.ceil(count / 10));
  const activeBar = active === null ? undefined : spec.bars[active];

  return (
    <figure className="chart">
      <figcaption>
        <strong>{spec.title}</strong>
        <span className="chart-unit">
          {spec.seriesName}, {spec.unit}
        </span>
      </figcaption>
      <div className="chart-scroll">
        <div className="chart-canvas" style={{ width }}>
          <svg width={width} height={height} role="group" aria-label={`${spec.title}. ${spec.seriesName}, ${spec.unit}.`}>
            {ticks.map((tick) => (
              <g key={tick}>
                <line className="chart-grid" x1={LEFT} x2={LEFT + plotWidth} y1={yOf(tick)} y2={yOf(tick)} />
                <text className="chart-tick" x={LEFT - 8} y={yOf(tick) + 4} textAnchor="end">
                  {formatValue(tick, "")}
                </text>
              </g>
            ))}
            {spec.bars.map((bar, index) => {
              const x = xOf(index);
              const y = yOf(bar.value);
              const value = formatValue(bar.value, spec.unit);
              return (
                <g
                  key={bar.label}
                  className="chart-bar"
                  data-active={active === index}
                  tabIndex={0}
                  role="img"
                  aria-label={`${bar.label}: ${value}`}
                  onPointerEnter={() => {
                    setActive(index);
                  }}
                  onPointerLeave={() => {
                    setActive(null);
                  }}
                  onFocus={() => {
                    setActive(index);
                  }}
                  onBlur={() => {
                    setActive(null);
                  }}
                >
                  <rect className="chart-hit" x={LEFT + index * slot} y={TOP} width={slot} height={PLOT_HEIGHT + BOTTOM} />
                  <path className="chart-mark" d={barPath(x, y, barWidth, baseline)} />
                  {printed.has(index) ? (
                    <text className="chart-value" x={x + barWidth / 2} y={y - 6} textAnchor="middle">
                      {value}
                    </text>
                  ) : null}
                  {index % tickEvery === 0 ? (
                    <text className="chart-tick" x={x + barWidth / 2} y={baseline + 18} textAnchor="middle">
                      {bar.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
            <line className="chart-axis" x1={LEFT} x2={LEFT + plotWidth} y1={baseline} y2={baseline} />
          </svg>
          {/* The tip sits above the bar, and above the printed value when the bar has one. */}
          {active !== null && activeBar !== undefined ? (
            <div
              className="chart-tip"
              role="status"
              style={{ left: xOf(active) + barWidth / 2, top: yOf(activeBar.value) - (printed.has(active) ? 24 : 8) }}
            >
              <span className="chart-tip-label">{activeBar.label}</span>
              <span className="chart-tip-value">{formatValue(activeBar.value, spec.unit)}</span>
            </div>
          ) : null}
        </div>
      </div>
      {spec.caption === null ? null : <p className="chart-caption">{spec.caption}</p>}
      <details className="chart-table">
        <summary>Show the data as a table</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">
                {spec.seriesName}, {spec.unit}
              </th>
            </tr>
          </thead>
          <tbody>
            {spec.bars.map((bar) => (
              <tr key={bar.label}>
                <th scope="row">{bar.label}</th>
                <td>{formatValue(bar.value, spec.unit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
