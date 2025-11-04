import instance from "@/lib/axios";
import type {
  CoffeeBrand,
  WeeklyMood,
  CoffeeConsumptionResponse,
} from "@/models/Chart";

export const MockService = {
  // 인기 커피 브랜드
  getCoffeeBrands: async (): Promise<CoffeeBrand[]> => {
    const response = await instance.get("/mock/top-coffee-brands");
    return response.data;
  },

  // 주간 무드 트렌드
  getWeeklyMood: async (): Promise<WeeklyMood[]> => {
    const response = await instance.get("/mock/weekly-mood-trend");
    return response.data;
  },

  // 커피 소비량 데이터
  getCoffeeConsumption: async (): Promise<CoffeeConsumptionResponse> => {
    const response = await instance.get("/mock/coffee-consumption");
    return response.data;
  },
};
