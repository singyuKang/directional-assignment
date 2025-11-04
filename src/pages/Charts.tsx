import { useNavigate } from "react-router-dom";
import { useChartData } from "@/hooks/useChartData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import ChartHeader from "@/components/charts/ChartHeader";
import ChartCard from "@/components/charts/ChartCard";
import CoffeeBrandBarChart from "@/components/charts/CoffeeBrandBarChart";
import CoffeeBrandPieChart from "@/components/charts/CoffeeBrandPieChart";
import WeeklyMoodStackedBar from "@/components/charts/WeeklyMoodStackedBar";
import WeeklyMoodStackedArea from "@/components/charts/WeeklyMoodStackedArea";
import CoffeeConsumptionMultiLine from "@/components/charts/CoffeeConsumptionMultiLine";

export default function Charts() {
  const navigate = useNavigate();
  const { coffeeBrands, weeklyMood, coffeeConsumption, loading, error } =
    useChartData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onBack={() => navigate("/posts")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ChartHeader onNavigateBack={() => navigate("/posts")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 커피 브랜드 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="인기 커피 브랜드 - 바 차트">
            <CoffeeBrandBarChart data={coffeeBrands} />
          </ChartCard>
          <ChartCard title="인기 커피 브랜드 - 도넛 차트">
            <CoffeeBrandPieChart data={coffeeBrands} />
          </ChartCard>
        </div>

        {/* 주간 무드 트렌드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="주간 무드 트렌드 - 스택형 바 차트">
            <WeeklyMoodStackedBar data={weeklyMood} />
          </ChartCard>
          <ChartCard title="주간 무드 트렌드 - 스택형 면적 차트">
            <WeeklyMoodStackedArea data={weeklyMood} />
          </ChartCard>
        </div>

        {/* 커피 소비량 멀티라인 */}
        <ChartCard title="팀별 커피 소비량 vs 버그/생산성">
          <CoffeeConsumptionMultiLine data={coffeeConsumption} />
        </ChartCard>
      </div>
    </div>
  );
}
