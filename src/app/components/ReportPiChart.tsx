// 'use client';

// import { PolarArea } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   ArcElement,
//   Tooltip,
//   Plugin,
//   ChartOptions,
// } from 'chart.js';

// ChartJS.register(RadialLinearScale, ArcElement, Tooltip);

// export default function PaymentsBreakdown() {
//   const data = {
//     labels: ['Completed', 'Pending', 'Overdue'],
//     datasets: [{
//       data: [43, 32, 25],
//       backgroundColor: ['#0EA5E9', '#FBBF24', '#6B7280'],
//       borderWidth: 0,
//     }],
//   };

//   const options: ChartOptions<'polarArea'> = {
//     responsive: true,
//     maintainAspectRatio: true,   // Keep perfect circle
//     plugins: {
//       legend: { display: false },
//       tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` } },
//     },
//     scales: { r: { display: false } },
//   };

//   // Black center dot
//   const centerDot: Plugin<'polarArea'> = {
//     id: 'centerDot',
//     afterDatasetsDraw(chart) {
//       const { ctx, chartArea } = chart;
//       const cx = (chartArea.left + chartArea.right) / 2;
//       const cy = (chartArea.top + chartArea.bottom) / 2;
//       const r = Math.min(chartArea.width, chartArea.height) * 0.08;

//       ctx.save();
//       ctx.fillStyle = '#000';
//       ctx.beginPath();
//       ctx.arc(cx, cy, r, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.restore();
//     },
//   };

//   return (
//     <div className="flex items-center justify-center ">
//       {/* CARD — stays SMALL */}
//       <div className="w-96 rounded-2xl bg-white p-6 shadow-sm h-[520px]">
//         <h2 className="mb-6 text-center text-lg font-semibold text-gray-900">
//           Payments Breakdown
//         </h2>

//         {/* ZOOM CONTAINER — chart looks HUGE */}
//         <div className="mt-10 relative mx-auto h-[300px] w-76 overflow-hidden rounded-full">
//           <div className="absolute  scale-105 origin-center"> {/* ← ZOOM HERE */}
//             <PolarArea
//               data={data}
//               options={options}
//               plugins={[centerDot]}
//             />
//           </div>
//         </div>

//         {/* LEGEND — unchanged */}
//         <div className="mt-6 grid grid-cols-3 gap-4 text-center">
//           {data.labels.map((label, i) => (
//             <div key={label}>
//               <div className="mb-1 flex items-center justify-center">
//                 <div
//                   className="mr-2 h-3 w-3 rounded-full"
//                   style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
//                 />
//                 <span className="text-sm text-gray-600">{label}</span>
//               </div>
//               <p className="text-xl font-semibold text-gray-900">
//                 {data.datasets[0].data[i]}%
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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

/* ------------------------------------------------- DATA ------------------------------------------------- */
const data = {
  labels: ['Completed', 'Pending', 'Overdue'],
  datasets: [
    {
      data: [43, 32, 25],
      backgroundColor: ['#0EA5E9', '#FBBF24', '#6B7280'],
      borderWidth: 0,
    },
  ],
};

/* ----------------------------------------------- OPTIONS ----------------------------------------------- */
const options: ChartOptions<'polarArea'> = {
  responsive: true,
  maintainAspectRatio: true,          // keep a perfect circle
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` },
    },
  },
  scales: { r: { display: false } },
};

/* ------------------------------------------ BLACK-DOT PLUGIN ------------------------------------------ */
const centerDotPlugin: Plugin<'polarArea'> = {
  id: 'centerDot',
  afterDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    const cx = (chartArea.left + chartArea.right) / 2;
    const cy = (chartArea.top + chartArea.bottom) / 2;
    // 8 % of the smaller dimension → always visible, never too big
    const r = Math.min(chartArea.width, chartArea.height) * 0.08;

    ctx.save();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
};

/* ------------------------------------------------ COMPONENT -------------------------------------------- */
export default function PaymentsBreakdown() {
  return (
    <div className="flex  items-center justify-center md:w-full  lg:w-auto flex-grow md:bg-white lg:bg-transparent">
      {/* CARD – responsive width, max-width caps it on large screens */}
      <div className="w-full max-w-sm rounded-lg  bg-white p-4 lg:shadow-sm sm:max-w-md sm:p-3 md:max-w-md">
        <h2 className="mb-4 text-center text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl">
          Payments Breakdown
        </h2>

        {/* CHART – square container, scales with card */}
        <div className="mx-auto aspect-square w-full max-w-xs sm:max-w-sm md:max-w-sm">
          <PolarArea
            data={data}
            options={options}
            plugins={[centerDotPlugin]}
          />
        </div>

        {/* LEGEND – always 3 columns, never wraps */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center sm:gap-4">
          {data.labels.map((label, i) => (
            <div key={label}>
              <div className="mb-1 flex items-center justify-center">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
                />
                <span className="text-xs text-gray-600 sm:text-sm">{label}</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 sm:text-xl">
                {data.datasets[0].data[i]}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}