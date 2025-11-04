export interface CoffeeBrand {
  brand: string;
  popularity: number;
}

export interface WeeklyMood {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

export interface CoffeeConsumptionSeries {
  cups: number;
  bugs: number;
  productivity: number;
}

export interface CoffeeConsumption {
  team: string;
  series: CoffeeConsumptionSeries[];
}

export interface CoffeeConsumptionResponse {
  teams: CoffeeConsumption[];
}
