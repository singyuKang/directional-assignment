import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { WeeklyMood } from "@/models/Chart";

interface Props {
  data: WeeklyMood[];
}

export default function WeeklyMoodStackedArea({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis
          label={{ value: "백분율 (%)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Area
          type="monotone"
          dataKey="happy"
          stackId="1"
          stroke="#10B981"
          fill="#10B981"
          name="행복"
        />
        <Area
          type="monotone"
          dataKey="tired"
          stackId="1"
          stroke="#F59E0B"
          fill="#F59E0B"
          name="피곤"
        />
        <Area
          type="monotone"
          dataKey="stressed"
          stackId="1"
          stroke="#EF4444"
          fill="#EF4444"
          name="스트레스"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
