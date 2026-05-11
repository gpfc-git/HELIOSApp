import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function TimeChart({
  data = [],
  dataKey,
  unit = "",
  color = "#6366f1",
  label,
}) {
  const formatted = data.map((item) => ({
    ...item,
    _time: new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    _value: typeof item.value === "object" ? item.value[dataKey] : item.value,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={formatted}
        margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
        <XAxis
          dataKey="_time"
          tick={{ fill: "#7a7a9a", fontSize: 10 }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: "#7a7a9a", fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          unit={` ${unit}`}
        />
        <Tooltip
          contentStyle={{
            background: "#1a1a24",
            border: "1px solid #2a2a3a",
            borderRadius: "8px",
            fontSize: "12px",
            color: "#e2e2f0",
          }}
          formatter={(val) => [`${val} ${unit}`, label ?? dataKey]}
          labelStyle={{ color: "#7a7a9a" }}
        />
        <Line
          type="monotone"
          dataKey="_value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
