import { useQuery } from "@tanstack/react-query";
import { MockService } from "@/services/mockService";

// 커피 브랜드 데이터
export function useCoffeeBrands() {
  return useQuery({
    queryKey: ["coffeeBrands"],
    queryFn: MockService.getCoffeeBrands,
    staleTime: 10 * 60 * 1000,
  });
}

// 주간 무드 데이터
export function useWeeklyMood() {
  return useQuery({
    queryKey: ["weeklyMood"],
    queryFn: MockService.getWeeklyMood,
    staleTime: 10 * 60 * 1000,
  });
}

// 커피 소비량 데이터
export function useCoffeeConsumption() {
  return useQuery({
    queryKey: ["coffeeConsumption"],
    queryFn: MockService.getCoffeeConsumption,
    select: (data) => data.teams,
    staleTime: 10 * 60 * 1000,
  });
}
