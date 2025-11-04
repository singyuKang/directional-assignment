import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { CoffeeConsumption } from "../../services/mockService";

interface Props {
  data: CoffeeConsumption[];
}

const TEAM_COLORS: Record<string, string> = {
  Frontend: "#4F46E5",
  Backend: "#10B981",
  AI: "#F59E0B",
};

interface TransformedDataPoint {
  cups: number;
  [key: string]: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: TransformedDataPoint;
    value: number;
    dataKey: string;
  }>;
}

export default function CoffeeConsumptionMultiLine({ data }: Props) {
  const transformedData: TransformedDataPoint[] =
    data[0]?.series.map((_, index) => {
      const point: TransformedDataPoint = { cups: data[0].series[index].cups };

      data.forEach((team) => {
        point[`${team.team}_bugs`] = team.series[index].bugs;
        point[`${team.team}_productivity`] = team.series[index].productivity;
      });

      return point;
    }) || [];

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const cups = payload[0].payload.cups;

      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
          <p className="font-bold mb-2">커피 {cups}잔</p>
          {data.map((team) => (
            <div key={team.team} className="mb-2">
              <p
                className="font-semibold"
                style={{ color: TEAM_COLORS[team.team] }}
              >
                {team.team}
              </p>
              <p className="text-sm">
                버그: {payload[0].payload[`${team.team}_bugs`]}개
              </p>
              <p className="text-sm">
                생산성: {payload[0].payload[`${team.team}_productivity`]}점
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // 사각형 도트 렌더러
  const renderSquareDot = (props: {
    cx?: number;
    cy?: number;
    fill?: string;
  }): React.ReactElement => {
    const { cx, cy, fill } = props;
    if (cx === undefined || cy === undefined) {
      return <></>;
    }

    return (
      <rect
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill={fill}
        stroke={fill}
        strokeWidth={2}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="cups"
          label={{
            value: "커피 섭취량 (잔/일)",
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          yAxisId="left"
          label={{ value: "버그 수", angle: -90, position: "insideLeft" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: "생산성 점수", angle: 90, position: "insideRight" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />

        {data.map((team) => (
          <React.Fragment key={team.team}>
            {/* 버그 수 - 실선 + 원형 마커 */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={`${team.team}_bugs`}
              stroke={TEAM_COLORS[team.team]}
              strokeWidth={2}
              dot={{ r: 5, strokeWidth: 2 }}
              name={`${team.team} 버그`}
            />
            {/* 생산성 - 점선 + 사각형 마커 */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={`${team.team}_productivity`}
              stroke={TEAM_COLORS[team.team]}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={(props) =>
                renderSquareDot({ ...props, fill: TEAM_COLORS[team.team] })
              }
              name={`${team.team} 생산성`}
            />
          </React.Fragment>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
