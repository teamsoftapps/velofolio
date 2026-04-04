function generateChartData(items: { title: string; count: any; percentageChange: number; theme: string }[], timeRange: string) {
  const subtitle = timeRange === "7 Days" ? "(This Week)" :
    (timeRange === "30 Days" || timeRange === "Mtd") ? "(This Month)" :
      "(This Year)";

  return items.map(item => ({
    ...item,
    subtitle
  }));
}

export default generateChartData;
