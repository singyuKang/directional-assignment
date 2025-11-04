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
import type { CoffeeBrand } from "../../services/mockService";

interface Props {
  data: CoffeeBrand[];
}

export default function CoffeeBrandBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="brand" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="popularity" fill="#4F46E5" name="인기도 (%)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
