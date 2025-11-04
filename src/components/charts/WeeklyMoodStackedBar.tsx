import {
  BarChart,
  Bar,
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

export default function WeeklyMoodStackedBar({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis
          label={{ value: "백분율 (%)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="happy" stackId="a" fill="#10B981" name="행복" />
        <Bar dataKey="tired" stackId="a" fill="#F59E0B" name="피곤" />
        <Bar dataKey="stressed" stackId="a" fill="#EF4444" name="스트레스" />
      </BarChart>
    </ResponsiveContainer>
  );
}
