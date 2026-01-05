export default function MonthlyBarChart({ monthlyTotals }) {
  const entries = Object.entries(monthlyTotals).sort((a, b) => a[0].localeCompare(b[0]));
  const max = entries.length ? Math.max(...entries.map(([, v]) => v)) : 0;
  const width = 420;
  const height = 160;
  const barWidth = entries.length ? Math.floor((width - 40) / entries.length) : 0;

  return (
    <svg width={width} height={height} style={{ border: '1px solid #ddd' }}>
      {/* axes */}
      <line x1="30" y1="10" x2="30" y2={height - 30} stroke="#444" />
      <line x1="30" y1={height - 30} x2={width - 10} y2={height - 30} stroke="#444" />
      {entries.map(([month, val], idx) => {
        const h = max ? Math.round(((val / max) * (height - 60))) : 0;
        const x = 35 + idx * barWidth;
        const y = height - 30 - h;
        return (
          <g key={month}>
            <rect x={x} y={y} width={barWidth - 6} height={h} fill="#4c84f1" />
            <text x={x} y={height - 12} fontSize="10">{month}</text>
            <text x={x} y={y - 4} fontSize="10">₹{val.toFixed(0)}</text>
          </g>
        );
      })}
    </svg>
  );
}