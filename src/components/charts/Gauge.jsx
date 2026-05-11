import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

function kpColor(kp) {
  if (kp <= 3) return "#22c55e";
  if (kp <= 6) return "#f59e0b";
  return "#ef4444";
}

function kpLabel(kp) {
  if (kp <= 3) return "Quiet";
  if (kp <= 5) return "Unsettled";
  if (kp <= 7) return "Storm";
  return "Severe Storm";
}

export function Gauge({ value = 0, max = 9, unit = "Kp" }) {
  const pct = Math.min(value / max, 1);
  const color = kpColor(value);
  const data = [{ value: pct * 100 }];

  return (
    <div className="flex flex-col items-center gap-2">
      <ResponsiveContainer width="100%" height={180}>
        <RadialBarChart
          cx="50%"
          cy="80%"
          innerRadius="65%"
          outerRadius="95%"
          startAngle={180}
          endAngle={0}
          data={data}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            background={{ fill: "#1a1a24" }}
            dataKey="value"
            fill={color}
            cornerRadius={6}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="flex flex-col items-center -mt-10">
        <span className="text-3xl font-bold" style={{ color }}>
          {value.toFixed(1)}
        </span>
        <span className="font-metadata text-metadata text-text-muted">
          {unit} — {kpLabel(value)}
        </span>
      </div>
    </div>
  );
}
