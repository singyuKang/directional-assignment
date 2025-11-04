import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import type { CoffeeBrand } from "../../services/mockService";

interface Props {
  data: CoffeeBrand[];
}

const COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

// Recharts가 요구하는 데이터 형태로 변환
interface ChartData {
  [key: string]: string | number;
  brand: string;
  popularity: number;
}

export default function CoffeeBrandPieChart({ data }: Props) {
  // 데이터 변환 - name 필드 추가
  const chartData: ChartData[] = data.map((item) => ({
    brand: item.brand,
    name: item.brand, // Legend를 위한 name 필드 추가
    popularity: item.popularity,
  }));

  // 커스텀 라벨 렌더러
  const renderLabel = (props: PieLabelRenderProps) => {
    const item = props as unknown as ChartData & PieLabelRenderProps;
    return `${item.brand}: ${item.popularity}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="popularity"
          nameKey="brand" // Legend에 brand를 표시
          label={renderLabel}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
