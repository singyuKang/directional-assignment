import {
  useCoffeeBrands,
  useWeeklyMood,
  useCoffeeConsumption,
} from "./queries/useChartQueries";

export function useChartData() {
  const coffeeBrandsQuery = useCoffeeBrands();
  const weeklyMoodQuery = useWeeklyMood();
  const coffeeConsumptionQuery = useCoffeeConsumption();

  const loading =
    coffeeBrandsQuery.isLoading ||
    weeklyMoodQuery.isLoading ||
    coffeeConsumptionQuery.isLoading;

  const error =
    coffeeBrandsQuery.error ||
    weeklyMoodQuery.error ||
    coffeeConsumptionQuery.error;

  return {
    coffeeBrands: coffeeBrandsQuery.data ?? [],
    weeklyMood: weeklyMoodQuery.data ?? [],
    coffeeConsumption: coffeeConsumptionQuery.data ?? [],
    loading,
    error: error ? "데이터를 불러오는데 실패했습니다." : "",
  };
}
