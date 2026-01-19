import type { ChartData } from "@/types";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { HandCoins } from "lucide-react";

const chartConfig = {
  amount: {
    label: "amount",
    color: "var(--chart-3)",
    icon: HandCoins,
  },
} satisfies ChartConfig;

function ExpenseChart({
  chartData,
  labelKey,
}: {
  chartData: ChartData[];
  labelKey: string;
}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey={labelKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default ExpenseChart;
