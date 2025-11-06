
'use client';

import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Plugin,
  ChartOptions,
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip);


const data = {
  labels: ['Paid', 'Pending', 'Overdue'],
  datasets: [
    {
      data: [4300, 3500, 3200],
      backgroundColor: ['#0EA5E9', '#FBBF24', '#6B7280'],
      borderWidth: 0,
    },
  ],
};


const options: ChartOptions<'polarArea'> = {
  responsive: true,
  maintainAspectRatio: true,          // keep a perfect circle
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: { label: ctx => `$ ${ctx.label}: ${ctx.raw}` },
    },
  },
  scales: { r: { display: false } },
};


const centerDotPlugin: Plugin<'polarArea'> = {
  id: 'centerDot',
  afterDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    const cx = (chartArea.left + chartArea.right) / 2;
    const cy = (chartArea.top + chartArea.bottom) / 2;
    const r = Math.min(chartArea.width, chartArea.height) * 0.08;

    ctx.save();


    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },
};

export default function PaymentsBreakdown() {
  return (
    <div className="flex  items-center justify-center md:w-full  lg:w-auto flex-grow md:bg-white lg:bg-transparent">

      <div className="mb-3 w-full max-w-sm rounded-lg  bg-white p-4 lg:shadow-sm sm:max-w-md sm:p-3 md:max-w-sm">
        <h2 className="mb-1 text-center text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl">
          Payments Breakdown
        </h2>


        <div className="mx-auto aspect-square w-full max-w-xs sm:max-w-sm md:max-w-xs">
          <PolarArea
            data={data}
            options={options}
            plugins={[centerDotPlugin]}
          />
        </div>


        <div className="mb-2 grid grid-cols-1 gap-3 text-center sm:gap-4">
          {data.labels.map((label, i) => (
            <div key={label} className='w-full flex  items-center justify-between'>
              <div className="mb-1 flex items-center justify-center">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
                />
                <span className="text-xs text-gray-600 sm:text-sm">{label}</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 sm:text-md">
                ${data.datasets[0].data[i]}
               <span
  className="text-sm p-1 sm:text-sm ml-2 rounded"
  style={{
    backgroundColor: data.datasets[0].backgroundColor[i],
    color:
      data.datasets[0].backgroundColor[i].includes("gray") ||
      data.datasets[0].backgroundColor[i] === "#6B7280"
        ? "white"
        : "black",
  }}
>
  + {data.datasets[0].data[i] / 100}%
</span>

              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}