/** @format */

import { ChartOptions } from 'chart.js';
import { colors } from '@/utils/colors';

export const getChartOptions = (stepSize: number = 1): ChartOptions<'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#111827',
      bodyColor: '#4B5563',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    }
  },
  scales: {
    x: {
      grid: { display: true, color: "rgba(0, 0, 0, 0.05)" },
      ticks: { color: '#6B7280', font: { size: 12 } }
    },
    y: {
      beginAtZero: true,
      grid: { display: true, color: "rgba(0, 0, 0, 0.05)" },
      ticks: { 
        stepSize,
        color: '#6B7280',
        font: { size: 12 }
      }
    }
  },
});

export const getGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(0, 181, 226, 0.4)");
  gradient.addColorStop(1, "rgba(0, 181, 226, 0.0)");
  return gradient;
};
